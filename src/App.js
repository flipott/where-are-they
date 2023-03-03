import React, { startTransition, useEffect, useState } from "react";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import ArtistsToFind from "./components/ArtistsToFind";
import ImageCanvas from "./components/ImageCanvas";
import WinnerInfo from "./components/WinnerInfo";
import Leaderboard from "./components/Leaderboard";
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, query } from "../node_modules/firebase/firestore";
import { storage } from "./firebase";
import { getStorage, ref, getDownloadURL, listAll } from "../node_modules/firebase/storage";

function App() {

  const [gameStatus, setGameStatus] = React.useState(false);
  const [toFind, setToFind] = React.useState([]);
  const [finalTime, setFinalTime] = React.useState(null);
  const [winner, setWinner] = React.useState(false);
  const [files, setFiles] = React.useState('');
  const [leaderScores, setLeaderScores] = React.useState([]);
  const [displayLeaderboard, setDisplayLeaderboard] = React.useState(false);

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
  }, [])

  useEffect(() => {
    const getLeaderboardScores = async () => {
      let completeArr = [];
      const querySnapshot = await getDocs(collection(db, "leaderboard"));
      querySnapshot.forEach((doc) => {
        completeArr.push(doc.data());
      });
      completeArr.sort(sortArr);
      setLeaderScores(completeArr.slice(0,10));
    }
    getLeaderboardScores();
  }, [])


  function sortArr(a, b) {
    const aParsed = parseInt(a.time.split(":").join(""), 10);
    const bParsed = parseInt(b.time.split(":").join(""), 10);
    if (aParsed < bParsed){
      return -1;
    }
    if (aParsed > bParsed){
      return 1;
    }
    return 0;
  }  

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
      return false;
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

    setWinner(true);
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

        {displayLeaderboard && <Leaderboard setDisplayLeaderboard={setDisplayLeaderboard} leaderScores={leaderScores} />}
        <div className="game">
          <div className="game-left">
            {gameStatus && <Timer setFinalTime={setFinalTime} toFind={toFind} />}
            {!gameStatus && !winner && <button onClick={startGame}>Start Game</button>}
            {!gameStatus && winner && <WinnerInfo finalTime={finalTime} setWinner={setWinner} setLeaderScores={setLeaderScores}/>}
            {gameStatus && <ArtistsToFind files={files} toFind={toFind}/>}
          </div>
          <div className="main-img">
            <ImageCanvas gameStatus={gameStatus} toFind={toFind} checkSelection={checkSelection}/>
          </div>
        </div>
      </div>
      <div className="description-leaderboard">
          <button className="empty-btn">Leaderboard</button>
          <p className="description">Click on their heads to identify them!</p>
          <button onClick={() => setDisplayLeaderboard(true)}>Leaderboard</button>
        </div>
      <Footer />
    </div>
  );
}

export default App;
