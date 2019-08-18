import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import Navbar from './Navbar';
import Footer from './Footer/Footer';
import Transition from './Transition';
import Canvas from './Canvas';

import {
  DESKTOP_MQ,
  NAVBAR_HEIGHT,
  MOBILE_MQ,
  MAX_CONTENT_WIDTH,
  WHITE
} from '../_common/config';

import './Layout.css';

const GlobalStyle = createGlobalStyle`
  body {
    padding-top: 0;
    background: #799ad6;
    color: ${WHITE};
    @${MOBILE_MQ} {
      padding-top: ${NAVBAR_HEIGHT};
    }
  }
`;

const AllWrapper = styled.div`
  position: relative;
  max-width: 960px;
  padding: 3rem 1.0875rem 1.45rem;
  margin: 0 auto;
  @${DESKTOP_MQ} {
    max-width: ${MAX_CONTENT_WIDTH};
  }
`;

const MainWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

const Layout = props => {
  return (
    <>
      <Canvas />
      <GlobalStyle />
      <Navbar />
      {props.transitions ? (
        <Transition {...props}>
          <AllWrapper>
            <MainWrapper>
              <main>{props.children}</main>
            </MainWrapper>
          </AllWrapper>
        </Transition>
      ) : (
        <>
          <AllWrapper>
            <MainWrapper>
              <main>{props.children}</main>
            </MainWrapper>
          </AllWrapper>
        </>
      )}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  transitions: PropTypes.bool
};

export default Layout;
