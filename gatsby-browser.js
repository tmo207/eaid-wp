import React from 'react'

import { StateProvider } from './src/_common/state'

export const wrapRootElement = ({ element }) => {
  const initialState = {
    menu: { open: false },
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'toggleMenu':
        return {
          ...state,
          menu: action.toggleMenuState,
        }

      default:
        return state
    }
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {element}
    </StateProvider>
  )
}

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
