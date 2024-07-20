import React from "react";
import { useDroppable } from "@dnd-kit/core";

function AnswerZone({
  answer,
  letterID,
  undo,
}: {
  answer: string | null;
  letterID: string[];
  undo: () => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
    data: { contents: [...letterID] },
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  const borderStyleToggle = isOver ? `border-green-200` : `border-slate-300`;
  function undoFn() {
    if (answer && answer.length > 0) {
      return undo();
    }
    return null;
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col align-middle leading-none text-fit-to-screen justify-center text-center uppercase font-bold border-2 rounded-xl ${borderStyleToggle} min-h-20 my-16 w-full px-2 md:px-7 select-none`}
      onClick={undoFn}
    >
      {answer}
    </div>
  );
}

export { AnswerZone };
