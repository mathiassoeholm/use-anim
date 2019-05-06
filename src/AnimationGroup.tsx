import React, { ReactNode } from 'react'
import { AnimationContext } from './animation-context'

interface Props {
  stagger?: number
  started?: boolean
  children: ReactNode
}

const AnimationGroup: React.FC<Props> = (props: Props) => {
  let stagger = 0

  return (
    <AnimationContext.Provider value={{
      started: props.started,
      getStagger: () => stagger,
      increaseStagger: () => stagger = stagger + (props.stagger || 0),
    }}>
      {props.children}
    </AnimationContext.Provider>
  )
}

export default AnimationGroup
