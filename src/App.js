import React from "react";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import ArtistsToFind from "./components/ArtistsToFind";

function App() {
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
            <button>Start Game</button>
            <ArtistsToFind />
          </div>
          <div className="main-img"><img src={require('./images/main.jpg')} /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
