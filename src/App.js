import React, {useState, useCallback, useEffect, useRef} from 'react';

import daremix from './daremix.mp3';
import './App.css';

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function Chicken({lock, top, left, onLoad}) {

  return <img src={`https://loremflickr.com/320/240/chicken?lock=${lock}`} onLoad={onLoad} style={{position: 'absolute', top, left}} alt="chicken" />
}

function App() {
  const [lockNumbers, setLockNumbers] = useState([]);
  const audioRef = useRef(null);

  const addNextImage = useCallback(() => {
    setTimeout(() => {
    setLockNumbers(lockNumbers => [...lockNumbers, {lock: getRandomNumber(4000), top: getRandomNumber(window.innerHeight - 240), left: getRandomNumber(window.innerWidth - 420) }]);
    }, 800)
  }, []);

  useEffect(() => {
    addNextImage();
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.currentTime = 45;
      audio.play();
    }
  }, [addNextImage])


  return (
    <div className="App" style={{position: 'fixed', width: '100vw', height: '100vh', backgroundColor: '#000'}}>
      <audio src={daremix} type="audio/mp3" ref={audioRef}/>
      {lockNumbers.map((lockNumber, idx) => {
        return <Chicken {...lockNumber} key={idx} onLoad={idx === lockNumbers.length - 1 ? addNextImage : null} />
      })}
    </div>
  );
}

export default App;
