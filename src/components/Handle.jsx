import React, { useState } from 'react';

export const Handle = ({
  idx,
  updateHandles,
  draggable,
  cropCanvasRef,
  x,
  y,
  radius,
  color,
}) => {
  const [center, setCenter] = useState({
    x: x - radius / 2,
    y: y - radius / 2,
  });

  const calculateNewHandlePosition = (e) => {
    const rect = cropCanvasRef?.current?.getBoundingClientRect();
    let newX = e.clientX;
    let newY = e.clientY;
    if (rect) {
      newX -= rect.left;
      newY -= rect.top;
    }
    updateHandles(idx, newX, newY);
    setCenter({ x: newX - radius / 2, y: newY - radius / 2 });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    calculateNewHandlePosition(e);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    calculateNewHandlePosition(e);
  };

  return (
    <div
      draggable={`${draggable}`}
      onDrag={handleDrag}
      onDragStart={(e) => !draggable && e.preventDefault()}
      onDragEnd={handleDragEnd}
      className="handle"
      style={{
        top: center.y,
        left: center.x,
        width: radius,
        height: radius,
        backgroundColor: color,
      }}></div>
  );
};
