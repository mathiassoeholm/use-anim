import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './app.css'
import { useAnim, easing, AnimationGroup } from 'use-anim'
import { lerp } from '@mathiassoeholm/js-utils/math'

const App: React.FC = () => {
  const [translation, setTranslation] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [text, setText] = useState('')
  const [opacity, setOpacity] = useState(0)

  useAnim({
    duration: 2000,
    playMode: 'pingPong',
    easing: easing.easeInOutQuad,
  }, t => {
    setTranslation(lerp(-300, 300, t))
    setRotation(t*360)
  });

  useAnim({
    duration: 8000,
  }, t => {
    let text = 'This text is being typed by use-anim :-)'
    setText(text.slice(0, Math.round(text.length*t)))
  })

  useAnim({
    duration: 1000,
  }, t => {
    setOpacity(t)
  })

  return (
    <div className="container" style={{ opacity: opacity }}>
      <h1>{text}</h1>
      <div className="ball" style={{ transform: `translateX(${translation}px) rotate(${rotation}deg)`}}/>
      <div className="staggered-box-container">
        <AnimationGroup stagger={200}>
          <StaggeredBox />
          <StaggeredBox />
          <StaggeredBox />
          <StaggeredBox />
          <StaggeredBox />
          <StaggeredBox />
        </AnimationGroup>
      </div>
    </div>
  );
}

const StaggeredBox: React.FC = () => {
  const [translation, setTranslation] = useState(-200)

  useAnim({
    duration: 800,
    easing: easing.easeOutBack,
  }, t => {
    setTranslation(lerp(-200, 200, t))
  })

  return <div className="staggered-box" style={{ transform: `translateX(${translation}px)`}}/>
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
