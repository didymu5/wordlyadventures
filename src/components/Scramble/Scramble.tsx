"use client";
import React, { useEffect, useState } from "react";
import { WordMix } from "@/components/Scramble/WordMix";
import { AnswerZone } from "@/components/Scramble/AnswerZone";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Retry } from "@/components/Scramble/Retry";

import { useRouter } from "next/navigation";

function Scramble({
  scramble,
  scramId = 0,
}: {
  scramble: any[];
  scramId?: number | 0;
}) {
  const [answer, setAnswer] = useState("");
  const [letterID, setLetterID] = useState<any[]>([]);
  const [isSolved, setIsSolved] = useState<boolean | null>(null);
  const router = useRouter();

  let letters = scramble[scramId].scramble.split("");
  let word = scramble[scramId].word;
  let hint = scramble[scramId].hint;
  let count = letters.length;
  let isLastScramble = !!scramble[scramble.length];
  function isCorrect(ans: string, word: string) {
    if (ans === word) {
      return true;
    }
    return false;
  }
  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (over && over.id !== "droppable") {
      return;
    }
    answer.length < count &&
      setAnswer((prev) => prev + active.data.current!.val);
    setLetterID((prev) => [...prev, active.id]);
  }
  function reset() {
    setAnswer("");
    setLetterID([]);
    setIsSolved(null);
  }
  function undo() {
    setLetterID((prev) => {
      prev.pop();
      return [...prev];
    });
    setAnswer((prev) => prev.slice(0, -1));
  }
  useEffect(() => {
    if (answer.length === count) {
      setIsSolved(isCorrect(answer, word));
    }
  }, [answer, count, word]);
  return (
    <>
      <div className="lg:text-xl text-md text-slate-700 2xl:p-12 xl:p-9 lg:p-7 p-5 w-full items-center text-center">
        Hint: {hint}
      </div>
      <DndContext onDragEnd={handleDragEnd} id="dnd_describe">
        <AnswerZone answer={answer} letterID={letterID} undo={undo} />
        <div className="flex flex-wrap gap-4 uppercase justify-center font-bold text-fit-to-screen border-2 px-5 md:px-1 border-slate-200 mb-12">
          <WordMix letters={letters} letterID={letterID} />
        </div>

        {isSolved === false && (
          <>
            <p className="text-red-600 text-lg mb-5">Not quite! try again!</p>{" "}
          </>
        )}
        {answer.length > 0 && isSolved !== true && (
          <Retry action={reset}>Reset</Retry>
        )}
        {isSolved === true && (
          <div>
            <p className="mb-10 text-center font-extrabold text-blue-800 text-xl">
              Correct!
            </p>
            {!isLastScramble && (
              <button
                onClick={() => router.push(`/scramble/${scramId + 1}`)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Next Scramble
              </button>
            )}
          </div>
        )}
      </DndContext>
    </>
  );
}

export { Scramble };
