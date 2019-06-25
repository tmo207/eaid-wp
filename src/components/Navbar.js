import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import BurgerMenu from './Menu/BurgerMenu'
import ListMenu from './Menu/ListMenu'

import { MAX_CONTENT_WIDTH } from '../_common/config'

const Wrapper = styled.div`
  z-index: 10000;
  position: relative;
`

const Bar = styled.div`
  width: ${props => (props.mobile ? '100vw' : `${MAX_CONTENT_WIDTH}`)};
  max-width: 100%;
  height: 5rem;
  position: fixed;
  background-color: ${props => (props.mobile ? '#799ad6' : '')};
  left: ${props => (props.mobile ? '0' : '50%')};
  transform: ${props => (props.mobile ? '' : 'translateX(-50%)')};
  top: ${props => (props.mobile ? '0' : '4rem')};
  padding: 0 1rem;
  display: flex;
  align-items: ${props => (props.mobile ? 'center' : '')};
  justify-content: space-between;
`

const Navbar = () => {
  const [show, setShowChild] = useState(false)
  const [mobile, getIsMobile] = useState()

  const checkWindowSize = () => {
    const width = window.innerWidth
    const mobileWidth = 1499
    if (width < mobileWidth) {
      getIsMobile(true)
    } else {
      getIsMobile(false)
    }
  }

  useEffect(
    () => {
      window.addEventListener('resize', checkWindowSize)
      return () => {
        window.removeEventListener('resize', checkWindowSize)
      }
    },
    [mobile]
  )

  useLayoutEffect(() => {
    checkWindowSize()
    setShowChild(true)
  })

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
  )
}

Navbar.propTypes = {}

export default Navbar

/*   < StaticQuery
query = { graphql`
      query {
        allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
render = { data => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <figure className="image">
            <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
          </figure>
        </Link>
      </div>
      <div className="navbar-start">
        {data.allWordpressPage.edges.map(edge => (
          <Link
            className="navbar-item"
            to={edge.node.slug}
            key={edge.node.slug}
          >
            {edge.node.title}
          </Link>
        ))}
      </div>
      <div className="navbar-end">
        <a
          className="navbar-item"
          href="https://github.com/GatsbyCentral/gatsby-starter-wordpress"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <img src={github} alt="Github" />
          </span>
        </a>
      </div>
    </div>
  </nav>
)}
/> */
