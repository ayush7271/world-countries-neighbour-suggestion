// import React, { useRef, useEffect, useState } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';

// const EyeDetection = ({ setEyeBlinkCount }) => {
// 	const webcamRef = useRef(null);
// 	const [areEyesOpen, setAreEyesOpen] = useState(false);
// 	const [eyeHeight, setEyeHeight] = useState();
// 	const [eyeValue, setEyeValue] = useState();
// 	const [imgValue, setImgValue] = useState('');
// 	useEffect(() => {
// 		const loadModels = async () => {
// 			await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
// 			await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
// 			await faceapi.nets.faceExpressionNet.loadFromUri('/models');
// 		};

// 		const startDetection = async () => {
// 			if (webcamRef?.current && webcamRef?.current?.video?.readyState === 4) {
// 				const videoEl = webcamRef.current.video;
// 				const displaySize = { width: videoEl.width, height: videoEl.height };
// 				faceapi.matchDimensions(webcamRef.current.video, displaySize);

// 				try {
// 					const detections = await faceapi
// 						.detectAllFaces(
// 							// .detectSingleFace
// 							videoEl,
// 							new faceapi.TinyFaceDetectorOptions()
// 						)
// 						.withFaceLandmarks()
// 						// .withFaceDescriptors()
// 						.withFaceExpressions();

// 					if (detections.length > 0) {
// 						const landmarks = detections[0].landmarks;
// 						const leftEye = landmarks.getLeftEye();
// 						const rightEye = landmarks.getRightEye();
// 						const leftEyeOpen = isEyeOpen(leftEye);
// 						const rightEyeOpen = isEyeOpen(rightEye);
// 						setAreEyesOpen(leftEyeOpen && rightEyeOpen);
// 						const expressions = detections[0].expressions;
// 						// Here you can use expressions to get the detected emotions
// 						// console.log('Detected expressions:', expressions);
// 					} else {	
// 						setAreEyesOpen(false);
// 						console.log('No user detected');
// 					}
// 				} catch (error) {
// 					console.error('Error detecting faces:', error);
// 				}
// 			}
// 			requestAnimationFrame(startDetection);
// 		};

// 		loadModels();
// 		startDetection();
// 	}, []);

// 	const isEyeOpen = (eyeLandmarks) => {
// 		const top = eyeLandmarks[1].y;
// 		const bottom = eyeLandmarks[5].y;
// 		const height = bottom - top;
// 		const threshold = height * 0.4; // You can adjust this threshold based on your needs
// 		setEyeValue(Math.floor(height));
// 		// console.log(Math.round(threshold),"threshold")
// 		// if (Math.floor(height) === 6) {
// 		// 	setEyeHeight(true);
// 		// } else {
// 		// 	setTimeout(()=>{
// 		// 		setEyeHeight(false);
// 		// 	},5000)
// 		// }

// 		// console.log(height ,eyeLandmarks[4].y - eyeLandmarks[1].y)

// 		// console.log(top,bottom,height,threshold)
// 		// return eyeLandmarks[4].y - eyeLandmarks[1].y > threshold;
// 	};
// 	//
// 	console.log(eyeValue, 'eyevalue');
// 	useEffect(() => {
// 		if (eyeValue === 6) {
// 			setEyeHeight(true);
// 		} else {
// 			setEyeHeight(false);
// 		}
// 	}, [eyeValue]);
// 	console.log(eyeValue)
// 	return (
// 		<div className={`${eyeValue===5?'black':'white'}`}>
// 				<Webcam
// 					ref={webcamRef}
// 					mirrored={true}
// 					className={`w-[95%] h-full m-auto `}
// 					style={{ transform: 'scaleX(1)' }}
// 				/>
			
// 			{/* <Webcam ref={webcamRef} mirrored={true} style={{ display: 'block', width:'200px', height:'200px', margin: 'auto', maxWidth: '100%', borderRadius:'50%' }} /> */}
// 			{/* <Webcam ref={webcamRef} mirrored={true} style={{width:'200px'}} /> */}
// 			{/* {eyeHeight ? (
// 				<p className='text-[#ffffff]'>Eyes are open.</p>
// 			) : (
// 				<p className='text-[#ffffff]'>fit your self in frame.</p>
// 			)} */}
// 			{/* <p className='text-[#373737]'>
// 				hey {eyeValue}
// 				{eyeHeight}
// 			</p> */}
				
// 		</div>
// 	);
// };

// export default EyeDetection;


import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import ProgressBar from './ProgressBar';

const EyeDetection = ({ setEyeBlinkCount }) => {
  const webcamRef = useRef(null);
  const [areEyesOpen, setAreEyesOpen] = useState(false);
  const [eyeHeight, setEyeHeight] = useState();
  const [eyeValue, setEyeValue] = useState();
  const [imgValue, setImgValue] = useState();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };

    const startDetection = async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const videoEl = webcamRef.current.video;
        const displaySize = { width: videoEl.width, height: videoEl.height };
        faceapi.matchDimensions(videoEl, displaySize);

        try {
          const detections = await faceapi
            .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

          if (detections.length > 0) {
            const landmarks = detections[0].landmarks;
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();
            const leftEyeOpen = isEyeOpen(leftEye);
            const rightEyeOpen = isEyeOpen(rightEye);
            setAreEyesOpen(leftEyeOpen && rightEyeOpen);
          } else {
            setAreEyesOpen(false);
            console.log('No user detected');
          }
        } catch (error) {
          console.error('Error detecting faces:', error);
        }
      }
    };

    const interval = setInterval(async () => {
      await startDetection();
    }, 100);

    loadModels();
    startDetection();

    // Clean up function to stop interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  const isEyeOpen = (eyeLandmarks) => {
    const top = eyeLandmarks[1].y;
    const bottom = eyeLandmarks[5].y;
    const height = bottom - top;
    const threshold = height * 0.4; // You can adjust this threshold based on your needs
    setEyeValue(Math.floor(height));
	console.log(Math.floor(height),"Math.floor(height)")
    return eyeLandmarks[4].y - eyeLandmarks[1].y > threshold;
  };

  useEffect(() => {
    if (eyeValue === 5) {
      setEyeHeight(true);
    } else {
      setEyeHeight(false);
    }
  }, [eyeValue]);

  return (
	<div style={{height:'765px', background: eyeValue===5 ? 'black' : 'green' }}>
	<Webcam
	  ref={webcamRef}
	  mirrored={true}
	  className={`w-[95%] h-full m-auto `}
	  style={{ transform: 'scaleX(1)' }}
	/>
	{/* {eyeHeight ? (
	  <p className='text-[#ffffff]'>Eyes are open.</p>
	) : (
	  <p className='text-[#ffffff]'>Fit yourself in frame.</p>
	)} */}
	{/* <ProgressBar threshold={eyeValue}/> */}
  </div>
  );
};

export default EyeDetection;



