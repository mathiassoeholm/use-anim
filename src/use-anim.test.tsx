import React from 'react'
import { renderHook, act } from 'react-hooks-testing-library'
import { delay } from '@mathiassoeholm/js-utils/async'
import {__createUseAnimEffect, useAnim} from './use-anim'
import AnimationGroup from './AnimationGroup'

describe('use-anim', () => {

  it('starts animation by default', async () => {
    const { result } = renderHook(() =>
      useAnim({
        duration: 1000,
        updateFunc: () => {},
      })
    )

    expect(result.current.startedAnimation).toBe(true)
  })

  it('does not start the animation if `started` is false', async () => {
    const { result } = renderHook(() =>
      useAnim({
        duration: 1000,
        updateFunc: () => {},
        started: false,
      })
    )

    expect(result.current.startedAnimation).toBe(false)
  })

  it('does not start the animation if `started` is false on AnimationGroup', async () => {
    const { result } = renderHook(() =>
      useAnim({
        duration: 1000,
        updateFunc: () => {},
      }),
      {
        wrapper: ({children}) => (
          <AnimationGroup started={false} >
            {children}
          </AnimationGroup>
        )
      },
    )

    expect(result.current.startedAnimation).toBe(false)
  })

  it('starts the animation if `started` is true on AnimationGroup', async () => {
    const { result } = renderHook(() =>
        useAnim({
          duration: 1000,
          updateFunc: () => {},
        }),
      {
        wrapper: ({children}) => (
          <AnimationGroup started={true} >
            {children}
          </AnimationGroup>
        )
      },
    )

    expect(result.current.startedAnimation).toBe(true)
  })

  it('respects the inner most `started` flag', async () => {
    const { result } = renderHook(() =>
        useAnim({
          duration: 1000,
          updateFunc: () => {},
          started: true,
        }),
      {
        wrapper: ({children}) => (
          <AnimationGroup started={false} >
            {children}
          </AnimationGroup>
        )
      },
    )

    expect(result.current.startedAnimation).toBe(true)
  })

  it('uses inner most AnimationGroup', async () => {
    const { result } = renderHook(() =>
        useAnim({
          duration: 1000,
          updateFunc: () => {},
        }),
      {
        wrapper: ({children}) => (
          <AnimationGroup started={true} >
            <AnimationGroup started={false} >
              {children}
            </AnimationGroup>
          </AnimationGroup>
        )
      },
    )

    expect(result.current.startedAnimation).toBe(false)
  })

  it('does not call update func if not started', async () => {
    const animEffect = __createUseAnimEffect(false, undefined, {
      duration: 50,
      updateFunc: () => fail()
    })

    animEffect()

    await delay(50)
  })

  it('does not call update func if not started', async () => {
    const animEffect = __createUseAnimEffect(false, undefined, {
      duration: 50,
      updateFunc: () => fail()
    })

    animEffect()

    await delay(50)
  })

  it('can be started and stopped', async () => {
    let running = false

    const animEffect = __createUseAnimEffect(true, undefined, {
      duration: 1000000,
      updateFunc: () => running = true
    })

    const stopEffect = animEffect()

    await delay(50)
    expect(running).toBe(true)

    running = false
    stopEffect!()

    await delay(50)
    expect(running).toBe(false)
  })

  it('keeps running if play mode is loop', async () => {
    let running = false

    const animEffect = __createUseAnimEffect(true, undefined, {
      duration: 5,
      updateFunc: () => running = true,
      playMode: 'loop',
    })

    animEffect()

    // Should be done after this delay, unless it's looping
    await delay(25)

    running = false

    // If running, allow it some time to set running to true
    await delay(25)

    expect(running).toBe(true)
  })
})
