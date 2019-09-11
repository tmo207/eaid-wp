import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import FooterItems from './FooterItems'
import FooterContact from './FooterContact'

import { DARKBLUE_FONT } from '../../_common/config'

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
  height: ${props => `${props.height}px`};
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

const StyledText = styled.p`
  color: inherit;
  margin: 0 0 1rem;
`

const StyledImage = styled(Img)`
  margin-bottom: 1rem;
`

export default class Footer extends React.Component {
  state = { height: 0 }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    const height = this.footerRef.clientHeight
    this.setState({ height: height })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.setState({ height: this.footerRef.clientHeight })
  }

  render() {
    return (
      <>
        <Spacer height={this.state.height} />
        <FooterContainer ref={footerRef => (this.footerRef = footerRef)}>
          <ElementWrapper>
            <FooterChild logos>
              <StyledText secondary>In Kooperation mit</StyledText>
              <StaticQuery
                query={footerImageQuery}
                render={logos => {
                  return logos.allWordpressAcfOptions.nodes[0].options.footerlogos.map(
                    logo => (
                      <StyledImage
                        fluid={logo.localFile.childImageSharp.fluid}
                        key={logo.localFile.id}
                      />
                    )
                  )
                }}
              />
            </FooterChild>
            <FooterChild>
              <FooterItems />
            </FooterChild>
            <FooterChild>
              <FooterContact />
            </FooterChild>
          </ElementWrapper>
        </FooterContainer>
      </>
    )
  }
}

const footerImageQuery = graphql`
  query footerImageQuery {
    allWordpressAcfOptions {
      nodes {
        options {
          footerlogos {
            localFile {
              id
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
  }
`
