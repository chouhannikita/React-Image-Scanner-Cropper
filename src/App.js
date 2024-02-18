import React, { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";
import Webcam from "react-webcam";
import "react-polygon-image-cropper/dist/style.css";
function App() {
  const webcamRef = useRef();
  const [saveCropImg, setSaveCropImg] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [croppedImage,setCroppedImage] = useState()
  useEffect(() => {}, [capturedImage]);

  const videoConstraints = {
    facingMode: "environment"
  };
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const saveCallback = () => {
    setSaveCropImg(true);
  };
  return (
    <div>
      {saveCropImg ? (
          <img src={croppedImage} alt="img" style={{height:"auto"}} className="box"/>
      ) : capturedImage ? (
        <div>
          <Canvas
            width={400}
            height={400}
            source={capturedImage}
            radius={15}
            color="red"
            setCroppedImage={setCroppedImage}
          />
          <button onClick={()=>saveCallback()} style={{marginTop:20}}>Crop</button>
        </div>
      ) : (
        <div>
          <Webcam
        ref={webcamRef}
        audio={false}
        height={400}
        width={400}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
          <button onClick={capture} >Capture photo</button>
        </div>
      )}
    </div>
  );
}
export default App;

  

