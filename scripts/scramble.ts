// generates the static store for scramble game.
// @ts-ignore
const fs = require("fs");
// const SCRAMBLE = require("./scrambles/summer_pool.json");

interface scramble {
  word: string;
  hint: string;
  scramble: string;
}
let SCRAMBLE = null;
const getFile = () => {
  let result = null;
  try {
    if (process.argv[2]) {
      result = fs.readFileSync(process.argv[2], "utf8");
      return JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
};
SCRAMBLE = getFile();

const shuffle = (array: string[]) => {
  //Fisher-yates
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
  scramble.forEach((element) => {
    element.scramble = shuffle(element.scramble.split("")).join("");
  });
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
