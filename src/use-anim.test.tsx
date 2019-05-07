import React from 'react'
import { renderHook, act } from 'react-hooks-testing-library'
import {useAnim} from './use-anim'
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
})
