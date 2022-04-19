import React, { useState, useReducer, useEffect } from "react";

import "./App.css";

import Gameboard from "../Gameboard/Gameboard";

const SINGLE: string[] = ["single player"];
const TWOPLAYER: string[] = ["two player"];

function App() {

  const [gameType, setGameType] = useState(TWOPLAYER);




  return (
    <div className="App">
      <h1>Connect Four</h1>
      <div className="newGame">
        <h3>Select game type:</h3>
        <button
          className={gameType[0] === "single player" ? "live" : "greyedOut"}
          onClick={() => {
            setGameType(SINGLE);
          }}
        >
          Single player
        </button>
        <button
          className={gameType[0] === "two player" ? "live" : "greyedOut"}
          onClick={() => {
            setGameType(TWOPLAYER);
          }}
        >
          Two player
        </button>
      </div>
      
        <Gameboard gameType={gameType} />
        
    
    </div>
  );
}

export default App;
