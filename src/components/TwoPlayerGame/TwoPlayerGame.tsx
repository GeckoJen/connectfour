import React, { useState, useEffect } from "react";

function TwoPlayerGameboard({ gameType }: { gameType: string[]  }) {
  const initialBoard: string[][] = [
    new Array(7).fill("O"),
    new Array(7).fill("O"),
    new Array(7).fill("O"),
    new Array(7).fill("O"),
    new Array(7).fill("O"),
    new Array(7).fill("O"),
  ];

  const [gameFrame, setGameFrame] = useState<string[][]>(initialBoard);

  const [redTurn, setRedTurn] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");

  function insertCoin(event: any) {
    if (!gameOver) {
      const columnIndex: number = Number(event.target.id);
      const rowIndex: number = Number(event.target.parentNode.id);
      console.log(columnIndex, rowIndex);
      const colour: string = redTurn ? "red" : "yellow";
      for (let i = 5; i >= 0; i--) {
        if (gameFrame[i][columnIndex] === "O") {
          setGameFrame([
            ...gameFrame.slice(0, i),
            [
              ...gameFrame[i].slice(0, columnIndex),
              colour,
              ...gameFrame[i].slice(columnIndex + 1),
            ],
            ...gameFrame.slice(i + 1),
          ]);
          setRedTurn(!redTurn);
        }
      }
      if (gameFrame[5][columnIndex] !== "O") {
        alert("That column is full. Pick another.");
      }
    }
  }

  function checkIfWon() {
    const colour: string = !redTurn ? "red" : "yellow";

    //check for horizontal win
    gameFrame.forEach((row) => {
      for (let i = 0; i < 4; i++) {
        if (
          row[i] === colour &&
          row[i + 1] === colour &&
          row[i + 2] === colour &&
          row[i + 3] === colour
        ) {
          row[i] = `${colour}win`;
          row[i + 1] = `${colour}win`;
          row[i + 2] = `${colour}win`;
          row[i + 3] = `${colour}win`;
          setWinner(colour);
          setGameOver(true);
          return;
        }
      }
    });

    //check for vertical win
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        if (
          gameFrame[i][j] === colour &&
          gameFrame[i + 1][j] === colour &&
          gameFrame[i + 2][j] === colour &&
          gameFrame[i + 3][j] === colour
        ) {
          gameFrame[i][j] = `${colour}win`;
          gameFrame[i + 1][j] = `${colour}win`;
          gameFrame[i + 2][j] = `${colour}win`;
          gameFrame[i + 3][j] = `${colour}win`;
          setWinner(colour);
          setGameOver(true);
          return;
        }
      }
    }

    //check for diagonal win
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          gameFrame[i][j] === colour &&
          gameFrame[i + 1][j + 1] === colour &&
          gameFrame[i + 2][j + 2] === colour &&
          gameFrame[i + 3][j + 3] === colour
        ) {
          gameFrame[i][j] = `${colour}win`;
          gameFrame[i + 1][j + 1] = `${colour}win`;
          gameFrame[i + 2][j + 2] = `${colour}win`;
          gameFrame[i + 3][j + 3] = `${colour}win`;
          setWinner(colour);
          setGameOver(true);
          return;
        }
      }
    }

    //check for diagonal win
    for (let i = 0; i < 3; i++) {
      for (let j = 3; j < 7; j++) {
        if (
          gameFrame[i][j] === colour &&
          gameFrame[i + 1][j - 1] === colour &&
          gameFrame[i + 2][j - 2] === colour &&
          gameFrame[i + 3][j - 3] === colour
        ) {
          gameFrame[i][j] = `${colour}win`;
          gameFrame[i + 1][j - 1] = `${colour}win`;
          gameFrame[i + 2][j - 2] = `${colour}win`;
          gameFrame[i + 3][j - 3] = `${colour}win`;
          setWinner(colour);
          setGameOver(true);
          return;
        }
      }
    }
  }

  useEffect(() => {
    checkIfWon();
  }, [redTurn]);

  function startNewGame() {
    setWinner("");
    setGameOver(false);
    setGameFrame([...initialBoard]);
  }

  return (
    <div>
      {/* <h3>This is a {gameType} game</h3> */}
      <div className="board">
        {gameFrame.map((element, index) => {
          return (
            <div className="row" id={String(index)} key={index}>
              {element.map((hole, index) => {
                return (
                  <div
                    className={hole}
                    id={String(index)}
                    key={index}
                    onClick={(event) => {
                      insertCoin(event);
                    }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      {redTurn && !winner && <h2>Next player: red</h2>}
      {!redTurn && !winner && <h2>Next player: yellow</h2>}
      {winner && <h2 className="winnerH2">{winner} wins!</h2>}
      <button className="newGameButton" onClick={startNewGame}>
        Start a new game
      </button>
    </div>
  );
}

export default TwoPlayerGameboard;
