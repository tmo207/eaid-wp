import React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import MobileMenu from './MobileMenu'

import { useStateValue } from '../../_common/state'
import { WHITE } from '../../_common/config'

const duration = 200

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

const MenuWrapper = styled.button`
  position: fixed;
  z-index: 11000;
  border: none;
  background: none;
`

const Bar = styled.div`
  width: 2.3rem;
  height: 4px;
  border-radius: 0.4rem;
  background-color: ${WHITE};
  margin: 0.5rem 0;
  transition: 0.4s;
`

const UpperBar = styled(Bar)`
  transform: ${props =>
    props.active ? 'rotate(-45deg) translate(-0.3125rem, 0.5rem)' : 'none'};
`

const LowerBar = styled(Bar)`
  transform: ${props =>
    props.active ? 'rotate(45deg) translate(0, -0.25rem)' : 'none'};
`

const BurgerMenu = () => {
  const [{ menu }, dispatch] = useStateValue()
  const { open } = menu

  return (
    <>
      <MenuWrapper
        title="Menu"
        aria-label="Navigation"
        aria-haspopup="true"
        onClick={() =>
          dispatch({
            type: 'toggleMenu',
            toggleMenuState: { open: !open },
          })
        }
      >
        <UpperBar active={open} />
        <LowerBar active={open} />
      </MenuWrapper>
      <Transition in={open} timeout={duration} unmountOnExit>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <MobileMenu />
          </div>
        )}
      </Transition>
    </>
  )
}

export default BurgerMenu
