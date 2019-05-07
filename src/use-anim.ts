import { useContext, useEffect, useState } from "react"
import {AnimationContext, AnimationContextProps} from "./animation-context"

interface AnimationConfig {
  updateFunc: UpdateFunc,
  duration: number,
  easing?: Easing,
  started?: boolean,
  playMode?: PlayMode,
}

type UpdateFunc = (t: number) => void
type Easing = (t: number) => number
type PlayMode = 'forward' | 'loop'

export function useAnim(config: AnimationConfig) {
  // Auto start animation if no other options override this
  let shouldStart = true

  const animationContext = useContext<AnimationContextProps|undefined>(AnimationContext)

  if (animationContext && animationContext.started != undefined) {
    shouldStart = animationContext.started
  }

  if (config.started != undefined) {
    shouldStart = config.started
  }

  const [startedAnimation, setStartedAnimation] = useState(shouldStart)

  if (!startedAnimation && shouldStart) {
    setStartedAnimation(true)
  }

  useEffect(
    __createUseAnimEffect(startedAnimation, animationContext, config),
    [startedAnimation],
  )

  return { startedAnimation }
}

// This function is only important, such that it can be used in tests.
export const __createUseAnimEffect = (
  startedAnimation: boolean,
  animationContext: AnimationContextProps|undefined,
  config: AnimationConfig,
) => () => {
  if (!startedAnimation) {
    return
  }

  let currentFrame: number|undefined = undefined
  let delay = 0

  if (animationContext) {
    delay = animationContext.getStagger()
    animationContext.increaseStagger()
  }

  setTimeout(() => {
    let startTime = Date.now()

    const update = () => {
      const elapsed = Date.now() - startTime
      let t = Math.min(1, elapsed/config.duration)

      if (config.easing) {
        t = config.easing(t)
      }

      config.updateFunc(t)

      if (elapsed < config.duration) {
        currentFrame = requestAnimationFrame(update)
      } else if (config.playMode === 'loop') {
        startTime = Date.now()
        currentFrame = requestAnimationFrame(update)
      }
    }

    currentFrame = requestAnimationFrame(update)
  }, delay)

  return () => {
    if (currentFrame != undefined) {
      cancelAnimationFrame(currentFrame)
    }
  }
}
