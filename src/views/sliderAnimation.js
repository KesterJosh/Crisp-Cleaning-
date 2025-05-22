import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
// import animationData from './your-animation.json'; // Replace with the path to your Lottie animation JSON file

const LottieAnimation = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: "https://storage.googleapis.com/playground-bucket-v2.teleporthq.io/cad0702d-5435-40c7-a994-fccf199a4d48/6e19e95d-b40a-4b7b-a81c-0e42c7cdd9fd",
    });

    let startFrame = 20;
    let endFrame = startFrame + 10;

    anim.playSegments([startFrame, endFrame], true);

    return () => {
      anim.destroy(); // Cleanup on component unmount
    };
  }, []);

  return <div ref={animationContainer} />;
};

export default LottieAnimation;
