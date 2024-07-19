// generates the static store for scramble game.
// @ts-ignore
const fs = require("fs");
const SCRAMBLE = require("./SCRAMBLE.json");

interface scramble {
  word: string;
  hint: string;
  scramble: string;
}

const shuffle = (array: string[]) => {
  const shuffled = array.slice();
  let currentIndex = shuffled.length;
  let temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }
  return shuffled;
};

function createScramble(scramble: scramble[]) {
  console.log(scramble);
  fs.writeFile(
    "src/store/scramble/game.json",
    JSON.stringify(scramble, null, 2),
    (err: Error) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("Data written to scramble/game.json successfully!");
      }
    }
  );
  return scramble;
}
createScramble(SCRAMBLE);
