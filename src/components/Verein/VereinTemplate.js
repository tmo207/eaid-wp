import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';

import Text from '../Text';
import Headline from '../Headline';
import Profile from './Profile';
import BoxContainer from '../ContentBox/BoxContainer';
import BoxElement from '../ContentBox/BoxElement';

import { ROUNDED_CORNERS } from '../../_common/config';

const StyledImg = styled.img`
  border-radius: ${ROUNDED_CORNERS};
`;

const VereinTemplate = ({ title, content }) => {
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
              edges {
                node {
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
                        bild
                        id
                      }
                    }
                    standort {
                      beschreibung
                      foto
                      uberschrift
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const personen = data.allWordpressPage.edges[0].node.acf.personen_page;
          const standort = data.allWordpressPage.edges[0].node.acf.standort;
          console.log(standort);

          return (
            <>
              {personen.map(person => (
                <Profile key={person.id} person={person} />
              ))}
              {standort && (
                <BoxContainer>
                  <BoxElement>
                    <Headline margin="0">{standort.uberschrift}</Headline>
                  </BoxElement>
                  {standort.foto && <StyledImg src={standort.foto} />}
                  <BoxElement>
                    <Text margin="0">{standort.beschreibung}</Text>
                  </BoxElement>
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
  content: PropTypes.string,
  id: PropTypes.number
};

export default VereinTemplate;
