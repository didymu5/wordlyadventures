"use client";
import React from "react";
import { Letter } from "@/components/Game/Letter";
import type { Letter as L } from "@/store/game";
type Props = {
  data: L[][];
};

const BoardLetters = ({ data }: Props) => {
  return (
    <>
      {data &&
        data.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            return (
              <Letter
                key={cell.id}
                value={cell.val}
                id={cell.id}
                x={cell.x!}
                y={cell.y!}
              />
            );
          })
        )}
    </>
  );
};
export default BoardLetters;
