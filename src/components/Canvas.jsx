import React, { useEffect, useRef, useState } from "react";
import { Handle } from "./Handle";
import "../index.css"
const Canvas = ({
  width,
  height,
  source,
  radius,
  color,
  draggable = true,
  setCroppedImage
}) => {
  const imageCanvasRef = useRef(null);
  const cropCanvasRef = useRef(null);
  const [drag,setDrag] = useState(false)
  const [touch,setTouch] = useState(false)
  const [coordinates, setCoordinates] = useState([
    { x: 0, y: 0, radius: radius, color: color },
    { x: 200, y: 0, radius: radius, color: color },
    { x: width , y: 0, radius: radius, color: color },
    { x: width , y: height -200, radius: radius, color: color },
    { x: width, y: height, radius: radius, color: color },
    { x: width - 200, y: 400, radius: radius, color: color },
    { x: 0, y: height, radius: radius, color: color },
    { x: 0, y: height - 200, radius: radius, color: color },
  ]);
  function drawLine(coordinates, idx, ctx) {
    ctx.beginPath();
    ctx.fill();
    ctx.moveTo(coordinates[idx].x, coordinates[idx].y);
    if (idx === coordinates.length - 1) {
      ctx.lineTo(coordinates[0].x, coordinates[0].y);
    } else {
      ctx.lineTo(coordinates[idx + 1].x, coordinates[idx + 1].y);
    }
    ctx.lineWidth = 4
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  function cropImage(imageCanvasRef) {
    if (imageCanvasRef.current) {
      const imageCtx = imageCanvasRef.current.getContext("2d");
  
      if (imageCtx) {
        const croppedCanvas = document.createElement("canvas");
        const croppedCtx = croppedCanvas.getContext("2d");
  
        const minX = Math.min(...coordinates.map(coord => coord.x));
        const minY = Math.min(...coordinates.map(coord => coord.y));
        const maxX = Math.max(...coordinates.map(coord => coord.x));
        const maxY = Math.max(...coordinates.map(coord => coord.y));
  
        croppedCanvas.width = maxX - minX;
        croppedCanvas.height = maxY - minY;
  
        croppedCtx.beginPath();
        croppedCtx.moveTo(coordinates[0].x - minX, coordinates[0].y - minY);
  
        coordinates.forEach(coord => {
          croppedCtx.lineTo(coord.x - minX, coord.y - minY);
        });
  
        croppedCtx.closePath();
        croppedCtx.clip();
  
        croppedCtx.drawImage(
          imageCtx.canvas,
          minX,
          minY,
          maxX ,
          maxY,
          0,
          0,
          croppedCanvas.width,
          croppedCanvas.height
        );
        const croppedImageUrl = croppedCanvas.toDataURL("image/png");
        if(drag){
          setCroppedImage(croppedImageUrl);
        }
        else{
          setCroppedImage(source)
        }
      }
    }
  }
  
  useEffect(() => {
    const canvas = imageCanvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (context) {
        const image = new Image();
        image.onload = function () {
          context.imageSmoothingEnabled = false;
          context.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
        };
        image.src = source;
      }
    }
    const handleCanvas = cropCanvasRef.current;
    if (handleCanvas) {
      handleCanvas.width = width;
      handleCanvas.height = height;
    }
  }, [source]);

  useEffect(() => {
    const cropCanvas = cropCanvasRef.current;
    if (cropCanvas) {
      const cropContext = cropCanvas.getContext("2d");
      cropImage(imageCanvasRef, cropCanvasRef, coordinates);
      cropContext?.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
      coordinates.forEach((_, idx) => drawLine(coordinates, idx, cropContext));
    }
  }, [coordinates]);

  
  const updateCoordinates = (idx, x, y,isTouch) => {
    setTouch(isTouch)
    const handlesCopy = [...coordinates];
    setDrag(true)
    handlesCopy[idx] = { ...handlesCopy[idx], x: x, y: y };
    setCoordinates(handlesCopy);
  };

  return (
    <div
      className="react-polygon-bounding-box"  style={{ height: height, width: width,zoom:touch ? 0.7:''}} >
      <canvas
        style={{ height: height, width: width }}
        className="react-polygon-image-canvas"
        hidden={false}
        ref={imageCanvasRef}
      />
      <canvas
        style={{ height: "100%", width: "100%",objectFit:"cover",zoom:touch ? 0.7:''}}
        className="react-polygon-crop-canvas"
        ref={cropCanvasRef}
      />
     
      {coordinates.map((handle, idx) => (
        <Handle
          key={idx}
          idx={idx}
          {...handle}
          updateHandles={updateCoordinates}
          draggable={draggable}
          cropCanvasRef={cropCanvasRef}
        />
      ))}
    </div>
  );
};

export default Canvas;
