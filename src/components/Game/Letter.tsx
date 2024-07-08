import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  DOMElement,
  MouseEvent,
} from "react";
import { useGameStore } from "@/store/game";
import { motion } from "framer-motion";
type Props = {
  id: string;
  value: string;
  x: number;
  y: number;
  letterOfWord?: string;
  isTracking?: boolean;
  isComplete?: boolean;
};
/**
 * EVENTs of this compoinent
 * start of mouse drag
 * has mouse hover - highlight when start of mouse drag
 *
 */

function Letter({ id, value, letterOfWord, isComplete = false, x, y }: Props) {
  const [isSelected, setIsSelected] = useState(false);
  const isSelectedOrActiveClass = isSelected
    ? "bg-red-300"
    : isComplete
    ? "bg-emerald-300"
    : "bg-transparent";

  const { updateLetter, currentSelection } = useGameStore();

  useEffect(() => {
    const noSelectElements =
      document.querySelectorAll<HTMLElement>(".no-select");
    noSelectElements.forEach((element: HTMLElement | Element) => {
      // @ts-ignore
      element.style.webkitUserSelect = "none";
      // element.style.mozUserSelect = "none";
      // element.style.msUserSelect = "none";
      // @ts-ignore
      element.style.userSelect = "none";
    });
    if (currentSelection?.id === id) {
      setIsSelected(true);
    }
  }, [currentSelection, id]);
  // useEffect(() => {
  //   // how to handle overlapping letters
  //   isSelected && updateLetter({ val: value, id: id, x: x, y: y });
  //   // !isSelected && removeLetter(value);
  // }, [isSelected, updateLetter, removeLetter, value, id, x, y]);
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // updateLetter(value);
    // setIsSelected(!isSelected);
    updateLetter({ val: value, id: id, x: x, y: y });
  };
  return (
    <motion.div
      whileTap={{ scale: 1.1 }}
      onClick={handleClick}
      className={`no-select rounded-full flex w-full h-0 aspect-w-1 aspect-h-1 ${isSelectedOrActiveClass} content-center text-center justify-center text-responsive-sm md:text-responsive-md lg:text-responsive-lg uppercase`}
    >
      {value}
    </motion.div>
  );
}

export { Letter };
