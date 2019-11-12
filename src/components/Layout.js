import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { IntlProvider } from 'react-intl';

import Navbar from './Navbar';
import Footer from './Footer/Footer';
import Transition from './Transition';
import Canvas from './Canvas';
import Meta from './Meta';

import messages_de from '../i18n/de';
import messages_en from '../i18n/en';
import {
  DESKTOP_MQ,
  NAVBAR_HEIGHT,
  MOBILE_MQ,
  MAX_CONTENT_WIDTH,
  WHITE
} from '../_common/config';
import { getLanguage } from '../_common/func';

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
  const language = getLanguage();

  const messages = {
    de: messages_de,
    en: messages_en
  };

  const { transitions, children } = props;

  return (
    <IntlProvider
      locale={language}
      messages={messages[language]}
      defaultLocale="de"
    >
      <Meta />
      <Canvas />
      <GlobalStyle />
      <Navbar />
      {transitions ? (
        <Transition {...props}>
          <AllWrapper>
            <MainWrapper>
              <main>{children}</main>
            </MainWrapper>
          </AllWrapper>
        </Transition>
      ) : (
        <>
          <AllWrapper>
            <MainWrapper>
              <main>{children}</main>
            </MainWrapper>
          </AllWrapper>
        </>
      )}
      <Footer />
    </IntlProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  transitions: PropTypes.bool
};

export default Layout;
