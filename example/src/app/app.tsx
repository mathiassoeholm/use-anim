import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './app.css'
import { useAnim, easing } from 'use-anim'

const App: React.FC = () => {
  const [translation, setTranslation] = useState(0);
  const [rotation, setRotation] = useState(0);

  useAnim({
    duration: 1000,
    updateFunc: (t) => {
      setTranslation(t*200)
      setRotation(t*30)
    },
    playMode: 'pingPong',
    easing: easing.easeInOutQuad,
  });

  return (
    <div className="container">
      <div className="ball" style={{ transform: `translateX(${translation}px) rotate(${rotation}deg)`}}/>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
