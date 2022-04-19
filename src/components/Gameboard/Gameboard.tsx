import React, { useEffect, useState } from "react";
import SinglePlayerGameboard from "../../SinglePlayerGame/singleplayer";
import TwoPlayerGameboard from "../TwoPlayerGame/TwoPlayerGame";
import "../App/App.css";

function Gameboard({ gameType }: {gameType: string[] }) {
  
  console.log(gameType)

  return (
    <div>
      {gameType[0] === "single player" && <SinglePlayerGameboard gameType={gameType} />}
      {gameType[0] === "two player" && <TwoPlayerGameboard gameType={gameType} />}
    </div>
  );
}

export default Gameboard;
