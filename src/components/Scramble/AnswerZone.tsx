import React from "react";
import { useDroppable } from "@dnd-kit/core";

function AnswerZone({
  answer,
  letterID,
}: {
  answer: string | null;
  letterID: string[];
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
    data: { contents: [...letterID] },
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  const borderStyleToggle = isOver ? `border-green-200` : `border-slate-300`;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex gap-2 text-responsive-sm uppercase font-bold border-2 ${borderStyleToggle} min-h-20 my-16 w-full md:w-1/2 py-2 px-7 select-none`}
    >
      {answer}
    </div>
  );
}

export { AnswerZone };
