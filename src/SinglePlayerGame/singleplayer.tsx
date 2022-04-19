import React, { useState, useEffect } from "react";

function SinglePlayerGameboard({ gameType }: { gameType: string[] }) {
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
  const [checked, setChecked] = useState<boolean>(false)

  function insertCoin(event: any) {
    if (!gameOver && redTurn) {
      const columnIndex: number = Number(event.target.id);
      const colour: string = "red";
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
          setRedTurn(false);
        }
      }
      if (gameFrame[5][columnIndex] !== "O") {
        alert("That column is full. Pick another.");
      }
    }
  }

  function computerTurn() {
    if (!gameOver && !redTurn) {
      console.log("it's my turn now");
      let columnIndex: number = Math.floor(Math.random() * 7);
      const colour: string = "yellow";
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
        }
      }
      if (gameFrame[5][columnIndex] !== "O") {
        alert("That column is full. Pick another.");
      }
      setRedTurn(true);
    }
  }

    useEffect(() => {
      checkIfWon();
   }, [redTurn]);
  
     useEffect(() => {
       setTimeout(computerTurn, 1000);
     }, [checked]);

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
          if (colour === "red") {
            setWinner("You win!");
          } else {
            setWinner("Computer wins!");
          }
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
          if (colour === "red") {
            setWinner("You win!");
          } else {
            setWinner("Computer wins!");
          }
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
          if (colour === "red") {
            setWinner("You win!");
          } else {
            setWinner("Computer wins!");
          }
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
          if (colour === "red") {
            setWinner("You win!");
          } else {
            setWinner("Computer wins!");
          }
          setGameOver(true);
          return;
        }
      }
    }
    setChecked(!checked)
  }



  function startNewGame() {
    setWinner("");
    setGameOver(false);
    setRedTurn(true)
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
      {redTurn && !winner && <h2>Your turn</h2>}
      {!redTurn && !winner && <h2>Computer's turn</h2>}
      {winner && <h2 className="winnerH2">{winner}</h2>}
      <button className="newGameButton" onClick={startNewGame}>
        Start a new game
      </button>
    </div>
  );
}

export default SinglePlayerGameboard;
