## use-anim

[![minified size](https://badgen.net/bundlephobia/min/use-anim)](https://bundlephobia.com/result?p=use-anim)
[![npm version](https://badgen.net/npm/v/use-anim)](https://www.npmjs.com/package/use-anim)

Super small easy-to-use hook-based animation library for React.

* Zero dependencies
* Written in TypeScript
* Very small code-base

### Installation

    npm install use-anim
    
or

    yarn add use-anim

### Usage

```javascript
import React, {useState} from 'react'
import { useAnim, easing } from 'use-anim'

// A component that makes its children
// appear with a fancy fade animation
const FadeReveal = ({ children }) => {
  const [opacity, setOpacity] = useState(0)
  const [translation, setTranslation] = useState(-30)

  useAnim({
    duration: 500,
    updateFunc: (t) => {
      setOpacity(t)
      setTranslation(-30*(1-t))
    },
    easing: easing.easeOutQuad,
  })

  return (
    <div style={{ opacity, transform: `translateY(${translation}px)`}}>
      {children}
    </div>
  )
}
```

### AnimationConfig

To start an animation you give useAnim an object compatible with the following interface:

```typescript
interface AnimationConfig {
  updateFunc: UpdateFunc,
  duration: number,
  easing?: Easing,
  started?: boolean,
  playMode?: PlayMode,
}
```

**updateFunc:** The code to run on every animation frame. It's a function which optionally takes a parameter `t`.

**duration:** How long does the animation run in milliseconds.

**easing:** A function that accepts a value `t` in range 0-1 and returns a modified number in the same range. This is used to get a more smooth animation.

**started:** If the animation should not start automatically, you can set this value to `false`. The animation will start when this is changed to `true`.

**playMode:** Controls playback of the animation. Valid values are: `forward` (default), `reverse`, `loop` and `pingPong`. 

### Contributing
