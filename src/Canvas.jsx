import React, { useEffect, useRef, useState } from 'react';

const Canvas = ({
  width,
  height,
  source,
  radius,
  color,
  draggable = true,
  proximity,
  cropEvent,
  resetEvent,
  rescaleEvent,
  saveProps,
  styles,
  customCallback,
}) => {
  const [handles, setHandles] = useState([
    { x: 10, y: 10, radius: radius, color: color },
    { x: width - 10, y: 10, radius: radius, color: color },
    { x: width - 10, y: height - 10, radius: radius, color: color },
    { x: 10, y: height - 10, radius: radius, color: color },
  ]);
  const [cropped, setCropped] = useState(false);
  const [center, setCenter] = useState({
    x: 10 - radius / 2,
    y: 10 - radius / 2,
  });

  const calculateNewHandlePosition = () => {
    let newX = 10;
    let newY = 10;
    
    updateHandles(newX, newY);
    setCenter({ x: newX - radius / 2, y: newY - radius / 2 });
  };
  const updateHandles = (idx, x, y) => {
    const handlesCopy = Array.from(handles);
    handlesCopy[idx] = { ...handlesCopy[idx], x: x, y: y };
    setHandles(handlesCopy);
  };
useEffect(()=>{
    calculateNewHandlePosition()
})
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
      className="react-polygon-bounding-box"
      style={{ height: height, width: width, ...styles }}>
     
      {handles.map((handle, idx) => (
        <>
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
      }}></div></>
      ))}
    </div>
  );
};

export default Canvas;
