import React, { startTransition, useEffect, useState } from "react";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import ArtistsToFind from "./components/ArtistsToFind";
import ImageCanvas from "./components/ImageCanvas";
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, query } from "../node_modules/firebase/firestore";


function App() {

  const [gameStatus, setGameStatus] = React.useState(false);
  const [toFind, setToFind] = React.useState([]);

  function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
     }
    return arr.slice(0,5);
  }

  async function getToFind() {
      let completeArray = [];
      const q = query(collection(db, "artists"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        completeArray.push(doc.id);
      })

      const newArr = shuffleArr(completeArray);
      return newArr;
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

  async function checkSelection(artistName, point) {
    console.log(`Artist: ${artistName} Coords: ${point}`)
    let currentArray = null;

    const docRef = doc(db, "artists", artistName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      currentArray = docSnap.data().coords;
      console.log(docSnap.data().image);
    } else {
      console.error("Document does not exist.");
    }

    const parseArr = JSON.parse(currentArray);

    if (inside(point, parseArr)) {
      console.log("YES!");
    } else {
      console.log("NO!");
    }

  }

  function generateCoords(x, y) {
    const a = [x+40, y];
    const b = [x, y+40];
    const c = [x+40, y+40];

    const poly = [b, [x,y], a, c];

    return JSON.stringify(poly);
  }


  // SQUARE COORDS: 
  // Otis Redding: [[61,152],[61,112],[101,112],[101,152]]
  // Eminem: [[133,100],[133,60],[173,60],[173,100]]
  // MF DOOM: [[227,186],[227,146],[267,146],[267,186]]
  // Bjork: [[279,157],[279,117],[319,117],[319,157]]
  // Buddy Holly [[355,40],[355,0],[395,0],[395,40]]
  // Alice Cooper [[530,51],[530,11],[570,11],[570,51]]
  // Mick Jagger: [[410,75],[410,35],[450,35],[450,75]]
  // Keith Richards: [[457,88],[457,48],[497,48],[497,88]]
  // James Brown: [[499,134],[499,94],[539,94],[539,134]]
  // Tina Turner: [[408,192],[408,152],[448,152],[448,192]]
  // Slash: [[358,217],[358,177],[398,177],[398,217]]
  // Ringo: [[90,242],[90,202],[130,202],[130,242]]
  // Gene Simmons: [[173,245],[173,205],[213,205],[213,245]]
  // David Bowie: [[204,250],[204,210],[244,210],[244,250]]
  // Debbie Harry: [[264,265],[264,225],[304,225],[304,265]]
  // Prince: [[313,268],[313,228],[353,228],[353,268]]
  // Anthony Keidis: [[412,287],[412,247],[452,247],[452,287]]
  // Billy Joe Armstrong: [[534,316],[534,276],[574,276],[574,316]]
  // Freddie Mercury: [[63,319],[63,279],[103,279],[103,319]]
  // Lemmy: [[133,331],[133,291],[173,291],[173,331]]
  // Axl Rose: [[12,461],[12,421],[52,421],[52,461]]
  // Elton John: [[83,498],[83,458],[123,458],[123,498]]
  // George Michael: [[130,455],[130,415],[170,415],[170,455]]
  // Bob Marley: [[185,421],[185,381],[225,381],[225,421]]
  // Adam Ant: [[191,524],[191,484],[231,484],[231,524]]
  // Elvis Presley: [[283,421],[283,381],[323,381],[323,421]]
  // Kurt Cobain: [[331,476],[331,436],[371,436],[371,476]]
  // Johnny Cash: [[368,540],[368,500],[408,500],[408,540]]
  // Lady Gaga: [[440,457],[440,417],[480,417],[480,457]]
  // Noodle: [[436,577],[436,537],[476,537],[476,577]]
  // Keith Flint: [[526,595],[526,555],[566,555],[566,595]]
  // Frank Sinatra: [[502,550],[502,510],[542,510],[542,550]]
  // Amy Winehouse: [[533,526],[533,486],[573,486],[573,526]]


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
            <Timer />
            <button onClick={startGame}>Start Game</button>
            <ArtistsToFind toFind={toFind} />
          </div>
          <div className="main-img">
            <ImageCanvas checkSelection={checkSelection}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
