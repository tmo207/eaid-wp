import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import Navbar from './Navbar';
import Footer from './Footer/Footer';

import {
  DESKTOP_MQ,
  NAVBAR_HEIGHT,
  MOBILE_MQ,
  MAX_CONTENT_WIDTH,
  WHITE
} from '../_common/config';

import './Layout.css';

const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100vh;
  }
  body {
    font-family: Asap;
    color: ${WHITE};
    font-size: 1.3rem;
    padding-top: 0;
    background: linear-gradient(#799AD6, #4469B1);
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

const Layout = ({ children }) => (
  <>
    <AllWrapper>
      <Navbar />
      <MainWrapper>
        <GlobalStyle />

        <main>{children}</main>
      </MainWrapper>
    </AllWrapper>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
