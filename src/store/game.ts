import { create } from "zustand";
import gameData from "./game.json";
import getAdjacent from "@/lib/getAdjacent";
export type Letter = { val: string; id: string; x?: number; y?: number };
type State = {
  letter: string;
  currentSelection: Letter | null;
  word: string;
  currentAttempt: Letter[]; // captures
  adjacents: Letter[] | null;
  matched: string[];
  wordGrid: Letter[][];
};

type Action = {
  initateGame: (words: string[], size: number) => void;
  updateLetter: ({ val, id }: Letter) => void;
  updateWord: (word: State["word"]) => void;
  removeLetter: (letter: State["letter"]) => void;
};

const isAttemptMatched = (attempt: string[], wordList: string[]) => {
  return wordList.includes(attempt.join(""));
};

const useGameStore = create<State & Action>((set, get) => ({
  letter: "",
  word: "",
  currentSelection: null,
  currentAttempt: [],
  compeltedWords: [],
  matched: [],
  wordGrid: [],
  adjacents: null,
  initateGame: (words, size) => {
    set(() => ({ wordGrid: gameData.gameGrid }));
  },
  updateLetter: ({ val, id, x, y }) => {
    // set((state) => ({
    //   currentAttempt: [...state.currentAttempt, { val, id }],
    // }));

    console.log(val, id, x, y);
    // get().adjacents
    // if there are adjacent elements then check if the ID is
    // in the adjacents [] then set new adjacents based on the new selected L
    // else if adjacents is null then add adjacents
    const Adjacents = get().adjacents;
    if (Adjacents && !!Adjacents.find((element) => element.id === id)) {
      // Check if ID is in the adjacents[]
      // if none then reset the new selected element/letter
      set(() => ({
        adjacents: [...getAdjacent(get().wordGrid, x!, y!)],
        currentSelection: { val, id, x, y },
      }));
    } else {
      set(() => ({
        adjacents: [...getAdjacent(get().wordGrid, x!, y!)],
        currentSelection: { val, id, x, y },
      }));
    }

    // set(() => ({ letter: letter }));
    // let countLettersi = get().currentAttempt.length;
    // if (
    //   countLetters > 2 &&
    //   isAttemptMatched(get().currentAttempt, gameData.words)
    // ) {
    //   set((state) => ({
    //     matched: [...state.matched, get().currentAttempt.join("")],
    //   }));
    //   set(() => ({ currentAttempt: [] }));
    // }
  },
  removeLetter: (id) => {
    // set((state) => {
    //   let idx = state.currentAttempt.indexOf(id);
    //   state.currentAttempt.splice(idx, 1);
    //   return { currentAttempt: [...state.currentAttempt] };
    // });
  },
  updateWord: (word) => set(() => ({ word: word })),
}));

export { useGameStore };
