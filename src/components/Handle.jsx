import React, { useState } from "react";

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
const [isTouch,setIsTouch] = useState(false)
  const calculateNewHandlePosition = (clientX, clientY) => {
    const rect = cropCanvasRef?.current?.getBoundingClientRect();
    let newX ;
    let newY ;
    if(isTouch){
      newX = clientX/0.7;
      newY = clientY/0.7;
    }
    else{
      newX = clientX;
      newY = clientY;
    }
    if (rect) {
      newX -= rect.left;
      newY -= rect.top;
  }
    updateHandles(idx, newX, newY,isTouch);
    setCenter({ x: newX - radius / 2, y: newY - radius / 2 });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    calculateNewHandlePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    setIsTouch(false)
    setIsTouch(true)
    const touch = e.touches[0];
    calculateNewHandlePosition(touch.clientX, touch.clientY);
  };

  const handleDragEnd = (e) => {
    setIsTouch(false)
    e.preventDefault();
    calculateNewHandlePosition(e.clientX, e.clientY);
  };

  const handleTouchEnd = (e) => {
    setIsTouch(true)
    const touch = e.changedTouches[0];
    calculateNewHandlePosition(touch.clientX, touch.clientY);
  };

  return (
    <div
      draggable={`${draggable}`}
      onDrag={handleDrag}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={(e) => !draggable && e.preventDefault()}
      onDragEnd={handleDragEnd}
      className="handle"
      style={{
        top: center.y,
        left: center.x,
        width: radius,
        height: radius,
        backgroundColor: color,
      }}
    ></div>
  );
};
