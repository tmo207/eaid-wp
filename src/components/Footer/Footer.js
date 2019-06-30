import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { WHITE, DARKBLUE_FONT } from '../../_common/config'

const FooterContainer = styled.footer`
  font-family: Asap;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 1rem;
  color: ${DARKBLUE_FONT};
  bottom: 0;
  left: 0;
  right: 0;
`

const Spacer = styled.div`
  margin-top: ${props => `${props.height}px`};
`

const ElementWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 3rem;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 2000px;
  margin: 0 auto;
`

const FooterChild = styled.div`
  padding: 1rem;
  width: ${props => (props.logos ? '15rem' : 'auto')};
  max-width: 100%;
  margin-right: 2rem;
`

const LinksWrapper = styled.div`
  margin-bottom: 2.5rem;
`

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 0.5rem;
  transition: 0.15s;
  &:hover {
    color: ${WHITE};
  }
`

const StyledText = styled.p`
  color: inherit;
  margin: 0 0 1rem;
`

const StyledImage = styled(Img)`
  margin-bottom: 1rem;
`

const body = document.body

export default class Footer extends React.Component {
  state = { height: 0 }

  componentDidMount() {
    const height = this.footerRef.clientHeight
    this.setState({ height: height })
  }

  render() {
    return ReactDOM.createPortal(
      <>
        <Spacer height={this.state.height} />
        <FooterContainer ref={footerRef => (this.footerRef = footerRef)}>
          <ElementWrapper>
            <FooterChild logos>
              <StyledText secondary>In Kooperation mit</StyledText>
              <StaticQuery
                query={footerQuery}
                render={logos => {
                  return logos.allWordpressWpMedia.edges.map(logo => (
                    <StyledImage
                      fluid={logo.node.localFile.childImageSharp.fluid}
                      key={logo.node.id}
                    />
                  ))
                }}
              />
            </FooterChild>
            <FooterChild>
              <LinksWrapper>
                <StyledLink to="">Der Verein</StyledLink>
                <StyledLink to="">Blog</StyledLink>
                <StyledLink to="">Veranstaltungen</StyledLink>
                <StyledLink to="">Publikationen</StyledLink>
                <StyledLink to="">Beitragsordnung & Satzung</StyledLink>
              </LinksWrapper>
              <LinksWrapper>
                <StyledLink to="">Impressum</StyledLink>
                <StyledLink to="">Datenschutz</StyledLink>
              </LinksWrapper>
            </FooterChild>
          </ElementWrapper>
        </FooterContainer>
      </>,
      body
    )
  }
}

const footerQuery = graphql`
  query footerImageQuery {
    allWordpressWpMedia(filter: { alt_text: { eq: "footer_logo" } }) {
      edges {
        node {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 240) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
