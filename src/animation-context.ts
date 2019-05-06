import React from 'react'

export interface AnimationContextProps {
  getStagger: () => number
  increaseStagger: () => void
  started?: boolean
}

export const AnimationContext = React.createContext<AnimationContextProps|undefined>(undefined)
