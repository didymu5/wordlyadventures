import { Permanent_Marker } from "next/font/google";
import React from "react";

type Props = {
  scramble: { word: string }[];
};

const pm = Permanent_Marker({ weight: "400", subsets: ["latin"] });

const ScrambleComplete = ({ scramble }: Props) => {
  return (
    <div
      className={`flex flex-col justify-center gap-5 text-center ${pm.className} bg-beach-scene bg-cover bg-center h-screen w-full`}
    >
      <h3 className="text-5xl">Words of the day!!!</h3>
      {scramble.map((item, index) => {
        return (
          <div
            key={index}
            className="text-4xl text-green-700 mt-6 drop-shadow-2xl"
          >
            {item.word}
          </div>
        );
      })}
    </div>
  );
};

export { ScrambleComplete };
