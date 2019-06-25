import React from 'react';
import styled from 'styled-components';

import MobileMenu from './MobileMenu';

import { useStateValue } from '../../_common/state';
import { WHITE } from '../../_common/config';

const MenuWrapper = styled.div`
  position: fixed;
  z-index: 11000;
`;

const Bar = styled.div`
  width: 2.3rem;
  height: 4px;
  border-radius: 0.4rem;
  background-color: ${WHITE};
  margin: 0.5rem 0;
  transition: 0.4s;
`;

const UpperBar = styled(Bar)`
  transform: ${props =>
    props.active ? 'rotate(-45deg) translate(-0.3125rem, 0.5rem)' : 'none'};
`;

const LowerBar = styled(Bar)`
  transform: ${props =>
    props.active ? 'rotate(45deg) translate(0, -0.25rem)' : 'none'};
`;

const BurgerMenu = () => {
  const [{ menu }, dispatch] = useStateValue();
  const { open } = menu;
  return (
    <>
      <MenuWrapper
        onClick={() =>
          dispatch({
            type: 'toggleMenu',
            toggleMenuState: { open: !open }
          })
        }
      >
        <UpperBar active={open} />
        <LowerBar active={open} />
      </MenuWrapper>
      {open && <MobileMenu />}
    </>
  );
};

export default BurgerMenu;
