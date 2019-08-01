import React from 'react';
import styled from 'styled-components';

import ListMenu from './ListMenu';
import { useLockBodyScroll } from '../../_common/func';

const MenuContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(121, 154, 214, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileMenu = () => {
  useLockBodyScroll();
  return (
    <MenuContainer role="navigation">
      <div>
        <ListMenu mobile />
      </div>
    </MenuContainer>
  );
};

export default MobileMenu;
