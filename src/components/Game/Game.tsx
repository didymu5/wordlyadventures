"use client";
import React, { useEffect, useState } from "react";
import { useGameStore } from "@/store/game";
import BoardLetters from "../BoardLetters";
/**
 * State
 * User clicks on a letter and the value is sent to the state manager
 * Check if the letter is part of the wordlist and allow the letter to be highlighted
 * If the letter selected completes the word highlight with new color to indicate that word was selected
 * Letters must be adjacent to one another either horizontally, verticall or diagonally.
 */
function Game() {
  // Use state to manage game logic
  const [gameState, setGameState] = useState({
    /* initial game state */
  });
  const { matched, currentSelection, wordGrid, adjacents, initateGame } =
    useGameStore();
  useEffect(() => {
    initateGame(["job", "ham", "cap"], 4);
  }, [initateGame]);
  return (
    <>
      {/* <span className="text-black">wordgrid: {JSON.stringify(wordGrid)}</span> */}
      <span className="text-black">
        currentSelection: {JSON.stringify(currentSelection)}
      </span>
      <span className="text-black">adjacents: {JSON.stringify(adjacents)}</span>
      <span className="text-black">matched: {JSON.stringify(matched)}</span>
      <div className="max-w-screen-lg bg-white bg-opacity-70 text-black w-screen">
        <div className="grid grid-cols-4 gap-0 mt-12 p-0">
          {/* adjust col based on grid  */}
          {wordGrid && <BoardLetters data={wordGrid} />}
        </div>
      </div>
    </>
  );
}

export { Game };
