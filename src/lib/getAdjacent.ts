// function getAdjacent(grid: any[][], i: number, j: number) {
//   let n = grid.length;
//   let m = grid[0].length;
//   let v = [];
//   for (var dx = i > 0 ? -1 : 0; dx <= (i <= n ? 1 : 0); ++dx) {
//     for (var dy = j > 0 ? -1 : 0; dy <= (j <= m ? 1 : 0); ++dy) {
//       if (dx != 0 || dy != 0) {
//         console.log(dx, dy, "i j", i, j);
//         if (!!grid[i + dx][j + dy]) {
//           v.push(grid[i + dx][j + dy]);
//         }
//       }
//     }
//   }
//   return v;
// }

// let DATA = [
//   ["c", "l", "o", "j"],
//   ["j", "a", "r", "o"],
//   ["x", "v", "t", "b"],
//   ["w", "o", "r", "k"],
// ];
// console.log(DATA[1][2]);
function isValidPos(i: number, j: number, n: number, m: number): boolean {
  if (i < 0 || j < 0 || i > n - 1 || j > m - 1) {
    return false;
  }
  return true;
}
function getAdjacent(grid: any[][], i: number, j: number) {
  let n = grid.length; //rows
  let m = grid[0].length; //cols
  let v = [];
  const topLeft = isValidPos(i - 1, j - 1, n, m) ? grid[i - 1][j - 1] : null;
  const top = isValidPos(i - 1, j, n, m) ? grid[i - 1][j] : null;
  const topRight = isValidPos(i - 1, j + 1, n, m) ? grid[i - 1][j + 1] : null;
  const left = isValidPos(i, j - 1, n, m) ? grid[i][j - 1] : null;
  const right = isValidPos(i, j + 1, n, m) ? grid[i][j + 1] : null;
  const bottomLeft = isValidPos(i + 1, j - 1, n, m) ? grid[i + 1][j - 1] : null;
  const bottom = isValidPos(i + 1, j, n, m) ? grid[i + 1][j] : null;
  const bottomRight = isValidPos(i + 1, j + 1, n, m)
    ? grid[i + 1][j + 1]
    : null;
  // const right = grid[i][j + 1];
  return [
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight,
  ].filter((val) => val !== null);
}

// console.log(getAdj(DATA, 0, 0));

export default getAdjacent;
