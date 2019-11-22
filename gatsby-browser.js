import React from 'react'

import Layout from './src/components/Layout'

import {
  MenuContextProvider,
  LanguageContextProvider,
} from './src/_common/state'

export const wrapRootElement = ({ element }) => {
  const initMenuState = {
    menu: { open: false },
  }

  const initLanguageState = {
    language: navigator.language.split(/[-_]/)[0] === 'de' ? 'de' : 'en',
  }

  const menuReducer = (state, action) => {
    switch (action.type) {
      case 'toggleMenu':
        return {
          menu: action.toggleMenuState,
        }

      default:
        return state
    }
  }

  const languageReducer = (state, action) => {
    switch (action.type) {
      case 'toggleLanguage':
        return {
          language: action.toggleLanguageState
        }

      default:
        return state
    }
  }

  return (
    <LanguageContextProvider initialState={initLanguageState} reducer={languageReducer}>
      <MenuContextProvider initialState={initMenuState} reducer={menuReducer}>
        {element}
      </MenuContextProvider>
    </LanguageContextProvider>
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
        }),
      transitions ? 350 : 0
    )
  } else {
    const savedPosition = getSavedScrollPosition(location)

    window.setTimeout(
      () =>
        window.scrollTo(
          ...(savedPosition || [
            {
              top: 0,
              left: 0,
            },
          ])
        ),
      transitions ? 350 : 0
    )
  }
  return false
}
