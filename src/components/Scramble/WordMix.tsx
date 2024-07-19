"use client";
import React, { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";

function Letter({
  val,
  order,
  isDisabled,
}: {
  val: string;
  order: number;
  isUsed?: boolean;
  isDisabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, over, active } =
    useDraggable({
      id: `draggable_${val + order}`,
      data: { val: val, id: `draggable_${val + order}` },
      disabled: isDisabled,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className={`select-none ${isDisabled && "text-slate-500"}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {val}
    </div>
  );
}
type Props = {
  letters: string[];
  letterID: string[];
};
function WordMix({ letters, letterID }: Props) {
  return (
    <>
      {letters.map((item, index) => {
        return (
          <Letter
            val={item}
            order={index}
            key={item + index}
            isDisabled={letterID.includes(`draggable_${item + index}`)}
          />
        );
      })}
    </>
  );
}

export { WordMix };
