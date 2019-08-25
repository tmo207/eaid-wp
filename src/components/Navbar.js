import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Logo from './Logo';
import BurgerMenu from './Menu/BurgerMenu';
import ListMenu from './Menu/ListMenu';

import { MAX_CONTENT_WIDTH, MAX_MOBILE_SIZE } from '../_common/config';

const Wrapper = styled.div`
  z-index: 10000;
  position: relative;
`;

const Bar = styled.div`
  width: ${props => (props.mobile ? '100vw' : `${MAX_CONTENT_WIDTH}`)};
  max-width: 100%;
  height: 5rem;
  position: fixed;
  background-color: ${props =>
    props.mobile ? 'rgba(121, 154, 214, 0.9)' : ''};
  left: ${props => (props.mobile ? '0' : '50%')};
  transform: ${props => (props.mobile ? '' : 'translateX(-50%)')};
  top: ${props => (props.mobile ? '0' : '4rem')};
  padding: 0 1rem;
  display: flex;
  align-items: ${props => (props.mobile ? 'center' : '')};
  justify-content: space-between;
`;

const Navbar = () => {
  const [show, setShowChild] = useState(false);
  const [mobile, getIsMobile] = useState();

  const checkWindowSize = () => {
    const width = window.innerWidth;
    const mobileWidth = MAX_MOBILE_SIZE;
    if (width < mobileWidth) {
      getIsMobile(true);
    } else {
      getIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [mobile]);

  useLayoutEffect(() => {
    checkWindowSize();
    setShowChild(true);
  });

  return (
    <Wrapper>
      {show && (
        <Bar mobile={mobile}>
          {mobile && <BurgerMenu />}
          {!mobile && <ListMenu />}
          <Logo mobile={mobile} />
        </Bar>
      )}
    </Wrapper>
  );
};

Navbar.propTypes = {};

export default Navbar;
