import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const MenuContext = createContext();
export const LanguageContext = createContext();

export const MenuContextProvider = ({ reducer, initialState, children }) => (
  <MenuContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </MenuContext.Provider>
);

export const LanguageContextProvider = ({ reducer, initialState, children }) => (
  <LanguageContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </LanguageContext.Provider>
);

export const useMenuStateValue = () => useContext(MenuContext);
export const useLanguageStateValue = () => useContext(LanguageContext);

MenuContextProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

LanguageContextProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
