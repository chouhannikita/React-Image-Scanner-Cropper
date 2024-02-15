import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import  Canvas  from './Canvas';
import "react-polygon-image-cropper/dist/style.css";

const Polygon = () => {
  const buttonRef = useRef(null);
  const webcamRef = React.useRef();
  const saveRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
 
 
  const videoConstraints = {
    width: 128,
    height: 72,
    facingMode: 'user',
  };
  const saveCallback = (imageUrl, coordinates) => {}

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

  };
 
  console.log(Canvas,"jkl")
  return (
    <div>
      {capturedImage ? (
        <>
          <Canvas
  width={300}
  height={300}
  source={capturedImage}
  radius={10}
  color="black"
  cropEvent={{ elementRef: buttonRef, eventType: "click" }}
  saveProps={{ saveRef, saveCallback }}
  styles={{
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
  }}
/>
  </>
      ) : (
        <Webcam
          audio={false}
          height={320}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={280}
          videoConstraints={videoConstraints}
        >
        </Webcam>
      )}
      <button onClick={capture}>Capture photo</button>
      <button ref={buttonRef}>Crop</button>
      <button ref={saveRef}>Save</button>
    </div>
  );
};

export default Polygon;
