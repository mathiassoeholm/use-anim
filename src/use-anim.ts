import { useContext, useEffect, useState } from "react"
import {AnimationContext, AnimationContextProps} from "./animation-context"

interface AnimationConfig {
  duration: number,
  easing?: Easing,
  started?: boolean,
  playMode?: PlayMode,
}

type UpdateFunc = (t: number) => void
type Easing = (t: number) => number
type PlayMode = 'forward' | 'reverse' | 'loop' | 'pingPong'

export function useAnim(config: AnimationConfig, updateFunc: UpdateFunc) {
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
    __createUseAnimEffect(startedAnimation, animationContext, config, updateFunc),
    [startedAnimation],
  )

  return { startedAnimation }
}

// This function is only exported, such that it can be used in tests.
export const __createUseAnimEffect = (
  startedAnimation: boolean,
  animationContext: AnimationContextProps|undefined,
  config: AnimationConfig,
  updateFunc: UpdateFunc,
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
    let reverse = config.playMode === 'reverse'

    const update = () => {
      const elapsed = Date.now() - startTime
      let t = Math.min(1, elapsed/config.duration)

      if (reverse) {
        t = 1-t
      }

      if (config.easing) {
        if (reverse) {
          t = 1 - config.easing(1-t)
        } else {
          t = config.easing(t)
        }
      }

      updateFunc(t)

      if (elapsed < config.duration) {
        currentFrame = requestAnimationFrame(update)
      } else if (config.playMode === 'loop' || config.playMode === 'pingPong') {
        startTime = Date.now()

        if (config.playMode === 'pingPong') {
          reverse = !reverse
        }

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
