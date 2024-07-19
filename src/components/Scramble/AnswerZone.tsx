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
      className={`flex gap-2 text-fit-to-screen-md justify-center uppercase font-bold border-2 rounded-xl ${borderStyleToggle} min-h-20 my-16 w-full py-1 px-7 select-none`}
      onClick={undoFn}
    >
      {answer}
    </div>
  );
}

export { AnswerZone };
