import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './app.css'
import { useAnim } from 'use-anim'

const App: React.FC = () => {
  const [translation, setTranslation] = useState(0);

  useAnim({
    duration: 1000,
    updateFunc: (t) => {
      setTranslation(t*200)
    },
    playMode: 'pingPong',
  });

  return (
    <div className="container">
      <div className="ball" style={{ transform: `translateX(${translation}px)`}}/>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
