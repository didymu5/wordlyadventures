// type Grid = string[][];

// function placeWordsInGrid(words: string[], gridSize: number): Grid | null {
//   // Initialize empty grid
//   const grid: Grid = [];
//   for (let i = 0; i < gridSize; i++) {
//     grid.push(Array(gridSize).fill(""));
//   }

//   // Function to check if a word can be placed at a specific position
//   const canPlaceWord = (
//     word: string,
//     row: number,
//     col: number,
//     direction: "horizontal" | "vertical" | "diagonal"
//   ) => {
//     for (let i = 0; i < word.length; i++) {
//       const newRow =
//         direction === "horizontal"
//           ? row
//           : direction === "vertical"
//           ? row + i
//           : row + i - col;
//       const newCol =
//         direction === "horizontal"
//           ? col + i
//           : direction === "vertical"
//           ? col
//           : col;

//       // Check if cell is within grid and not already occupied
//       if (
//         newRow < 0 ||
//         newRow >= gridSize ||
//         newCol < 0 ||
//         newCol >= gridSize ||
//         grid[newRow][newCol] !== ""
//       ) {
//         return false;
//       }
//     }
//     return true;
//   };

//   // Function to place a word in the grid
//   const placeWord = (
//     word: string,
//     row: number,
//     col: number,
//     direction: "horizontal" | "vertical" | "diagonal"
//   ) => {
//     for (let i = 0; i < word.length; i++) {
//       const newRow =
//         direction === "horizontal"
//           ? row
//           : direction === "vertical"
//           ? row + i
//           : row + i - col;
//       const newCol =
//         direction === "horizontal"
//           ? col + i
//           : direction === "vertical"
//           ? col
//           : col;
//       grid[newRow][newCol] = word[i];
//     }
//   };

//   // Try placing each word in all directions for each cell
//   for (const word of words) {
//     for (let row = 0; row < gridSize; row++) {
//       for (let col = 0; col < gridSize; col++) {
//         if (canPlaceWord(word, row, col, "horizontal")) {
//           placeWord(word, row, col, "horizontal");
//           continue;
//         }
//         if (canPlaceWord(word, row, col, "vertical")) {
//           placeWord(word, row, col, "vertical");
//           continue;
//         }
//         if (
//           row + word.length - 1 < gridSize &&
//           col + word.length - 1 < gridSize &&
//           canPlaceWord(word, row, col, "diagonal")
//         ) {
//           placeWord(word, row, col, "diagonal");
//           continue;
//         }
//       }
//     }
//   }

//   // Check if all cells are filled
//   for (let row = 0; row < gridSize; row++) {
//     for (let col = 0; col < gridSize; col++) {
//       if (grid[row][col] === "") {
//         return null;
//       }
//     }
//   }

//   return grid;
// }

// // Example usage
// const words = ["apple", "banana", "cat"];
// const gridSize = 5;

// const result = placeWordsInGrid(words, gridSize);

// if (result) {
//   console.log("Successfully placed words in grid:");
//   for (const row of result) {
//     console.log(row.join(""));
//   }
// } else {
//   console.log("Unable to place all words in the grid");
// }
