type Grid = string[][];

// Function to initialize an empty grid of given size
function initializeGrid(size: number): Grid {
  return Array.from({ length: size }, () => Array(size).fill(""));
}

// Function to check if a word can be placed at a given position
function canPlaceWord(
  grid: Grid,
  word: string,
  row: number,
  col: number,
  direction: "H" | "V" | "D"
): boolean {
  const size = grid.length;
  const len = word.length;

  for (let i = 0; i < len; i++) {
    let r = row,
      c = col;
    if (direction === "H") c += i;
    if (direction === "V") r += i;
    if (direction === "D") {
      r += i;
      c += i;
    }

    if (r >= size || c >= size || (grid[r][c] !== "" && grid[r][c] !== word[i]))
      return false;
  }
  return true;
}

// Function to place a word in the grid
function placeWord(
  grid: Grid,
  word: string,
  row: number,
  col: number,
  direction: "H" | "V" | "D"
): void {
  for (let i = 0; i < word.length; i++) {
    if (direction === "H") grid[row][col + i] = word[i];
    if (direction === "V") grid[row + i][col] = word[i];
    if (direction === "D") grid[row + i][col + i] = word[i];
  }
}

// Function to generate a random letter
function getRandomLetter(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[Math.floor(Math.random() * letters.length)];
}

// Function to fill empty spaces in the grid with random letters
function fillEmptySpaces(grid: Grid): void {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "") {
        grid[row][col] = getRandomLetter();
      }
    }
  }
}

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Main function to place all words in the grid
function placeWordsInGrid(words: string[], gridSize: number): Grid {
  const grid = initializeGrid(gridSize);
  const directions: ("H" | "V" | "D")[] = ["H", "V", "D"];
  const usedWords = new Set<string>();

  // Shuffle words and directions to randomize placement
  const shuffledWords = shuffleArray(words);
  const shuffledDirections = shuffleArray(directions);

  for (const word of shuffledWords) {
    if (usedWords.has(word)) continue;

    let placed = false;
    for (let row = 0; row < gridSize && !placed; row++) {
      for (let col = 0; col < gridSize && !placed; col++) {
        for (const direction of shuffledDirections) {
          if (canPlaceWord(grid, word, row, col, direction)) {
            placeWord(grid, word, row, col, direction);
            usedWords.add(word);
            placed = true;
            break;
          }
        }
      }
    }
  }

  fillEmptySpaces(grid); // Fill empty spaces with random letters
  return grid;
}

// Helper function to print the grid
function printGrid(grid: Grid): void {
  for (const row of grid) {
    console.log(row.map((cell) => cell || ".").join(" "));
  }
}
// @ts-ignore
const fs = require("fs");
const short = require("short-uuid");

interface Cell {
  val: string;
  id: string;
}
const transformArray = (array: string[][]): Cell[][] => {
  return array.map((row, i) =>
    row.map((cell, j) => ({ val: cell, id: short.generate(), x: i, y: j }))
  );
};

const createGame = () => {
  const WORDS = ["job", "ham", "work", "lab", "cat"];
  const grid = placeWordsInGrid(WORDS, 4);
  const gridData = transformArray(grid);
  const gameData = {
    gameGrid: gridData,
    words: WORDS,
  };
  JSON.stringify(gameData, null, 2);
  fs.writeFile(
    "src/store/game.json",
    JSON.stringify(gameData, null, 2),
    (err: Error) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("Data written to game.json successfully!");
      }
    }
  );
};
createGame();

const sampledata = {
  gameGrid: [
    ["c", "l", "o", "j"],
    ["j", "a", "a", "o"],
    ["x", "v", "t", "b"],
    ["w", "o", "r", "k"],
  ],
  words: ["cat", "lab", "job", "work", "ham"],
};

// placeWordsInGrid([["job", "ham", "work", "lab", "cat"]], 6)
// // Example usage
// const words = ["HELLO", "WORLD", "dog", "cat", "hat", "jack"];
// const gridSize = 5;
// const grid = placeWordsInGrid(words, gridSize);
// printGrid(grid);

// export { placeWordsInGrid };
