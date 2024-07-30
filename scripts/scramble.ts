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
function getFilesInDirectory(directoryPath: string): string[] {
  try {
    const files = fs.readdirSync(directoryPath);
    return files;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}
// console.log(getFilesInDirectory(SCRAMBLE_FILE_LIST));
function getScrambleWithLatestTimestamp(
  files: string[]
): scramble[] | undefined {
  const timestampRegex = /(\d+)_/;

  const sortedFiles = files.sort((a, b) => {
    const timestampA = Number(path.basename(a).match(timestampRegex)?.[1] || 0);
    const timestampB = Number(path.basename(b).match(timestampRegex)?.[1] || 0);
    return timestampB - timestampA; // Descending order
  });
  const scrambleFilename = sortedFiles.length > 0 ? sortedFiles[0] : undefined;
  try {
    const scrambleFile = fs.readFileSync(
      path.resolve(__dirname, "scrambles/" + scrambleFilename),
      "utf-8"
    );
    return JSON.parse(scrambleFile);
  } catch (error) {
    console.error(error);
  }
  return [];
}
const scramleList = getScrambleWithLatestTimestamp(
  getFilesInDirectory(SCRAMBLE_FILE_LIST)
);

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

function createScramble(scramble: scramble[] | undefined) {
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
createScramble(scramleList);
