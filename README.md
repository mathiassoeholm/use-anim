## use-anim

[![minified size](https://badgen.net/bundlephobia/min/use-anim)](https://bundlephobia.com/result?p=use-anim)
[![npm version](https://badgen.net/npm/v/use-anim)](https://www.npmjs.com/package/use-anim)

Super small easy-to-use hook-based animation library for React.

* Zero dependencies
* Written in TypeScript
* Very small code-base

Check it out on [CodeSandbox](https://codesandbox.io/s/4kox1m1m7?fontsize=14)!

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
    easing: easing.easeOutQuad,
  }, t => {
    setOpacity(t)
    setTranslation(-30*(1-t))
  })

  return (
    <div style={{ opacity, transform: `translateY(${translation}px)`}}>
      {children}
    </div>
  )
}
```

### AnimationConfig

To start an animation you give useAnim an object compatible with the following interface as the first parameter:

```typescript
interface AnimationConfig {
  duration: number,
  easing?: Easing,
  started?: boolean,
  playMode?: PlayMode,
}
```

**duration:** How long does the animation run in milliseconds.

**easing:** A function that accepts a value `t` in range 0-1 and returns a modified number in the same range. This is used to get a more smooth animation.

**started:** If the animation should not start automatically, you can set this value to `false`. The animation will start when this is changed to `true`.

**playMode:** Controls playback of the animation. Valid values are: `forward` (default), `reverse`, `loop` and `pingPong`. 

The second parameter, known as `updateFunc`, is a function which takes a parameter `t`. This is called every frame during the animation, with `t` running from 0 to 1.

### Drawbacks 😕
[As pointed out by a good Reddit user](https://www.reddit.com/r/reactjs/comments/bnqcnm/i_created_a_super_small_animation_library_for/enbdxw3?utm_source=share&utm_medium=web2x), using `setState` every frame can be expensive. It will trigger a rerender of the component and all its children. Therefore I recommend using this library for simple components that reside near the leafs.

### Contributing 👍

Pull requests are very welcome

To test locally, you can use:

    npm run build
    npm run copy-to-example
    
<sub>Note: The copy-to-example script uses the `cp` command which is not available through CMD on Windows. You can use Git Bash instead.</sub>

This will compile TypeScript to JavaScript in a folder called lib and copy this folder to example/node_modules/use-anim.
You can now test your new addition in the example project.

    cd example
    npm start

<sub>Note: Remember to run `npm install` in both the root directory and the example directory.</sub>
