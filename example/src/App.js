import React, {useState} from 'react';
import './App.css';
import { useAnim } from 'use-anim'

function App() {
  const [translation, setTranslation] = useState(0);

  useAnim({
    duration: 1000,
    updateFunc: (t) => {
      setTranslation(t*200)
    },
  });

  return (
    <div className="container">
      <div className="ball" style={{ transform: `translateX(${translation}px)`}}/>
    </div>
  );
}

export default App;
