import React, { startTransition, useEffect, useState } from "react";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import ArtistsToFind from "./components/ArtistsToFind";
import ImageCanvas from "./components/ImageCanvas";
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, query } from "../node_modules/firebase/firestore";
import { storage } from "./firebase";
import { getStorage, ref, getDownloadURL, listAll } from "../node_modules/firebase/storage";


function App() {

  const [gameStatus, setGameStatus] = React.useState(false);
  const [toFind, setToFind] = React.useState([]);
  const [finalTime, setFinalTime] = React.useState(null);
  const [files, setFiles] = React.useState('');

  useEffect(() => {
    const getArtistImages = async () => {
        const artistImages = ref(storage, 'artist-photos/')
        listAll(artistImages)
            .then(async (res) => {
            const { items } = res;
            const urls = await Promise.all(items.map((item) => getDownloadURL(item)));
            const names = await Promise.all(items.map((item) => item._location.path_.slice(14, -4)));
            let completeArr = [];

            for (let i = 0; i < names.length; i++) {
                const newObj = {
                    artistName: names[i],
                    imgUrl: urls[i]
                }
                completeArr.push(newObj);
            }
            setFiles(completeArr);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getArtistImages();
    console.log('received')
}, [])


  function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
     }
    return arr.slice(0,5);
  }

  function getToFind() {
      const completeArray = [
        "Debbie Harry",
        "Bob Marley",
        "Alice Cooper",
        "George Michael",
        "Mick Jagger",
        "Prince",
        "Amy Winehouse",
        "Frank Sinatra",
        "Axl Rose",
        "Otis Redding",
        "Eminem",
        "Lady Gaga",
        "Keith Flint",
        "Lemmy Kilmister",
        "James Brown",
        "Tina Turner",
        "Elvis Presley",
        "Freddie Mercury",
        "2D",
        "Buddy Holly",
        "Keith Richards",
        "Elton John",
        "Billie Joe Armstrong",
        "David Bowie",
        "Slash",
        "Gene Simmons",
        "Bjork",
        "Kurt Cobain",
        "MF Doom",
        "Anthony Kiedis",
        "Adam Ant",
        "Johnny Cash",
        "Ringo Starr"
      ]

      // const q = query(collection(db, "artists"));
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   completeArray.push(doc.id);
      // })

      const newArr = shuffleArr(completeArray);
      const objArr = newArr.map((item) => {
        return {artistName: item, found: false}
      })

      return objArr;
  }


  function inside(point, vs) {
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi >= y) != (yj >= y))
            && (x <= (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
  };

  useEffect(() => {
    checkWinner();
  },[toFind])

  async function checkSelection(artistName, point) {
    console.log(`Artist: ${artistName} Coords: ${point}`)
    let currentArray = null;

    const docRef = doc(db, "artists", artistName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      currentArray = docSnap.data().coords;
    } else {
      console.error("Document does not exist.");
    }

    const parseArr = JSON.parse(currentArray);

    if (inside(point, parseArr)) {
      setToFind((prevItems) => prevItems.map((item) => item.artistName === artistName ? {...item, found: true} : item))
    } else {
      console.log("Wrong.");
    }

  }

  function checkWinner() {
    if (!toFind.length) {
      return false;
    }

    for (let i = 0; i < toFind.length; i++) {
      if (toFind[i].found === false) {
        return false;
      }
    }
    console.log("You win!");
    setGameStatus(false);
  }

  async function startGame() {
    setGameStatus(true);
    setToFind(await getToFind());
  }





  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="description-leaderboard">
          <button className="empty-btn">Leaderboard</button>
          <p className="description">Click on their heads to identify them!</p>
          <button>Leaderboard</button>
        </div>
        <div className="game">
          <div className="game-left">
            {gameStatus && <Timer setFinalTime={setFinalTime} toFind={toFind} />}
            {!gameStatus && <button onClick={startGame}>Start Game</button>}
            {gameStatus && <ArtistsToFind files={files} toFind={toFind}/>}
          </div>
          <div className="main-img">
            <ImageCanvas gameStatus={gameStatus} toFind={toFind} checkSelection={checkSelection}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
