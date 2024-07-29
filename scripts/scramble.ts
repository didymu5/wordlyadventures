// generates the static store for scramble game.
// @ts-ignore
const fs = require("fs");
// const SCRAMBLE = require("./scrambles/summer_pool.json");
const path = require("path");
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
    } else {
      console.log("no file provided");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
// SCRAMBLE = getFile();

const SCRAMBLE_FILE_LIST = path.resolve(__dirname, "scrambles");
const getScrambleList = () => {
  if (fs.existsSync(SCRAMBLE_FILE_LIST)) {
    console.info("getting list of scrambles...");
    fs.readdir(SCRAMBLE_FILE_LIST, (err: any, files: any) => {
      // get list of scrambles and generate the games based on the file.
      return files;
    });
  }
  return;
};
console.log(getScrambleList());
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
  if (!scramble) {
    console.log("no valid scramble list.");
    return null;
  }
  scramble.forEach((element) => {
    element.scramble = shuffle(element.word.split("")).join("");
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
// createScramble(SCRAMBLE);
