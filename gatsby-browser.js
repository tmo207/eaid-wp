import React from 'react'

import Layout from './src/components/Layout'

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
  }
}

export const wrapPageElement = ({ element, props }, pluginOptions) => {
  const { transitions = true } = pluginOptions
  return (
    <Layout {...props} transitions={transitions}>
      {element}
    </Layout>
  )
}

export const shouldUpdateScroll = (
  { routerProps: { location }, getSavedScrollPosition },
  pluginOptions
) => {
  const { transitions = true } = pluginOptions

  if (location.action === 'PUSH') {
    window.setTimeout(
      () =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        }),
      transitions ? 350 : 0
    )
  } else {
    const savedPosition = getSavedScrollPosition(location)
    const savedPositionY = savedPosition[1]
    const savedPositionX = savedPosition[0]

    window.setTimeout(
      () =>
        window.scrollTo(
          {
            top: savedPositionY,
            left: savedPositionX,
            behavior: 'smooth',
          } || [
            {
              top: 0,
              left: 0,
              behavior: 'smooth',
            },
          ]
        ),
      transitions ? 350 : 0
    )
  }
  return false
}
