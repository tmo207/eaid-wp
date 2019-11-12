import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import Text from '../Text';
import Headline from '../Headline';
import Profile from './Profile';
import BoxContainer from '../ContentBox/BoxContainer';
import BoxElement from '../ContentBox/BoxElement';

import { ROUNDED_CORNERS } from '../../_common/config';
import { getRightLanguagePage } from '../../_common/func';
import { useLanguageStateValue } from '../../_common/state';

const StyledImg = styled(Img)`
  border-radius: ${ROUNDED_CORNERS};
`;

const VereinTemplate = ({ title, content }) => {
  const [{ language }] = useLanguageStateValue();

  return (
    <>
      {content && (
        <>
          <Headline>{`${title}.`}</Headline>
          <Text margin="0 0 3rem">{content}</Text>
        </>
      )}
      <StaticQuery
        query={graphql`
          query Verein {
            allWordpressPage(filter: { wordpress_id: { eq: 31 } }) {
              nodes {
                polylang_translations {
                  polylang_current_lang
                  title
                  acf {
                    personen_page {
                      __typename
                      ... on WordPressAcf_person {
                        biografie
                        email_adresse
                        name
                        tatigkeit
                        website
                        bild {
                          localFile {
                            childImageSharp {
                              fixed(width: 150, height: 150) {
                                ...GatsbyImageSharpFixed
                              }
                            }
                          }
                        }
                        id
                      }
                    }
                    standort {
                      beschreibung
                      foto {
                        localFile {
                          childImageSharp {
                            fluid(maxWidth: 960) {
                              ...GatsbyImageSharpFluid
                            }
                          }
                        }
                      }
                      uberschrift
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const rightLanguagePage = getRightLanguagePage(
            data.allWordpressPage.nodes[0].polylang_translations,
            language
          );

          const personen = rightLanguagePage.acf.personen_page;
          const { standort } = rightLanguagePage.acf;

          return (
            <>
              {personen &&
                personen.map(person => (
                  <Profile key={person.id} person={person} />
                ))}
              {standort && (
                <BoxContainer>
                  {standort.uberschrift && (
                    <BoxElement>
                      <Headline margin="0">{standort.uberschrift}</Headline>
                    </BoxElement>
                  )}
                  {standort.foto && (
                    <StyledImg
                      fluid={standort.foto.localFile.childImageSharp.fluid}
                    />
                  )}
                  {standort.beschreibung && (
                    <BoxElement>
                      <Text margin="0">{standort.beschreibung}</Text>
                    </BoxElement>
                  )}
                </BoxContainer>
              )}
            </>
          );
        }}
      />
    </>
  );
};

VereinTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string
};

export default VereinTemplate;
