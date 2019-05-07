import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './app.css'
import { useAnim, easing } from 'use-anim'

const App: React.FC = () => {
  const [translation, setTranslation] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [textAnimValue, setTextAnimValue] = useState(0)
  const [opacity, setOpacity] = useState(0)

  useAnim({
    duration: 2000,
    updateFunc: (t) => {
      setTranslation(t*400)
      setRotation(t*360)
    },
    playMode: 'pingPong',
    easing: easing.easeInOutQuad,
  });

  useAnim({
    duration: 8000,
    updateFunc: (t) => {
      setTextAnimValue(t)
    },
  })

  useAnim({
    duration: 1000,
    updateFunc: (t) => {
      setOpacity(t)
    },
  })

  const getText = () => {
    let text = 'This text is being typed by use-anim :-)'
    return text.slice(0, Math.round(text.length*textAnimValue))
  }

  return (
    <div className="container" style={{ opacity: opacity }}>
      <h1>{getText()}</h1>
      <div className="ball" style={{ transform: `translateX(${translation}px) rotate(${rotation}deg)`}}/>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
