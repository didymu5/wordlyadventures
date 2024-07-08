import React, { useRef, useState, useEffect } from "react";

const DragSelect = ({ children, onSelect }: any) => {
  const selectionRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (event) => {
    if (event.button !== 0) return; // Only handle left click

    setIsDragging(true);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    selectionRef.current.style.top = `${Math.min(startY, currentY)}px`;
    selectionRef.current.style.left = `${Math.min(startX, currentX)}px`;
    selectionRef.current.style.width = `${Math.abs(startX - currentX)}px`;
    selectionRef.current.style.height = `${Math.abs(startY - currentY)}px`;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const selectedElements = [];

    children.forEach((child) => {
      const element = child.ref?.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isOverlapping =
        rect.top <
          selectionRef.current.offsetTop + selectionRef.current.offsetHeight &&
        rect.left <
          selectionRef.current.offsetLeft + selectionRef.current.offsetWidth &&
        rect.bottom > selectionRef.current.offsetTop &&
        rect.right > selectionRef.current.offsetLeft;

      if (isOverlapping) {
        selectedElements.push(element);
      }
    });

    onSelect(selectedElements);
  };

  useEffect(() => {
    const handleWindowMouseUp = () => handleMouseUp();
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => window.removeEventListener("mouseup", handleWindowMouseUp);
  }, [isDragging]);

  return (
    <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
      {children}
      <div
        ref={selectionRef}
        className="drag-selection"
        style={{ display: isDragging ? "block" : "none" }}
      />
    </div>
  );
};

export default DragSelect;
