import React from 'react'

import Layout from './src/components/Layout'
import {
  MenuContextProvider,
  LanguageContextProvider,
} from './src/_common/state'

export const wrapPageElement = ({ element, props }, pluginOptions) => {
  const { transitions = true } = pluginOptions
  return (
    <Layout {...props} transitions={transitions}>
      {element}
    </Layout>
  )
}

export const wrapRootElement = ({ element }) => {
  const initialState = {
    menu: { open: false },
    language:
      typeof navigator !== `undefined`
        ? navigator.language.split(/[-_]/)[0] === 'de'
          ? 'de'
          : 'en'
        : 'de',
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
    <LanguageContextProvider initialState={initialState} reducer={reducer}>
      <MenuContextProvider initialState={initialState} reducer={reducer}>
        {element}
      </MenuContextProvider>
    </LanguageContextProvider>
  )
}
