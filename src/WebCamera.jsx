import React, { useEffect, useState } from 'react';
import ScanbotSDK from 'scanbot-web-sdk/webpack';

const WebCamera = () => {
  const [documentScanner, setDocumentScanner] = useState(null);

  useEffect(() => {
    const myLicenseKey = "";
    let scanner = null;

    const initializeScanner = async () => {
      
        const sdk = await ScanbotSDK.initialize({
          licenseKey: "",
          engine: '/'
        });
        scanner = await sdk.createDocumentScanner({
          containerId : "scan",
          videoConstraints : {
            facingMode: "environment",
            resizeMode: "none",
            width: { ideal: 340 },
            height: { ideal: 260 },
            onError : (err)=>{
                console.log(err,"err")
            },
            style: {
              outline: {
                polygon: {
                  fillCapturing: "rgba(0, 255, 0, 0.2)",
                  strokeCapturing: "green",
                  fillSearching: "rgba(255, 0, 0, 0.2)",
                  strokeSearching: "red",
                }
              }
            },
        }
        });
       console.log(scanner)
        setDocumentScanner(scanner);
    };
    
    initializeScanner()
    return () => {
      if (scanner) {
        scanner.dispose();
      }
    };
  }, []);
 
 
  return (
    <div>
      <div id="scan"  style={{height:400,width:400}}></div>
      {console.log(documentScanner,"kl")}
    </div>
  );
};

export default WebCamera;
