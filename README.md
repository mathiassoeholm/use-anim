## use-anim

[![minified size](https://badgen.net/bundlephobia/min/use-anim)](https://bundlephobia.com/result?p=use-anim)
[![npm version](https://badgen.net/npm/v/use-anim)](https://www.npmjs.com/package/use-anim)

Super small easy-to-use hook-based animation framework for React.

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


### Contributing
