import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Text from '../Text';
import BoxContainer from '../ContentBox/BoxContainer';
import AktuellesPreview from './AktuellesPreview';

import { AKTUELLES_ID, AKTUELLESARCHIV_ID } from '../../_common/config';

const AktuellesArchivTemplate = ({ content }) => {
  const data = useStaticQuery(graphql`
    query AktuellesArchiv {
      allWordpressWpApiMenusMenusItems(filter: { wordpress_id: { eq: 6 } }) {
        nodes {
          items {
            object_id
            wordpress_children {
              object_id
              wordpress_children {
                title
                object_id
                object_slug
              }
            }
          }
        }
      }
    }
  `);
  const archivVeranstaltungen = data.allWordpressWpApiMenusMenusItems.nodes[0].items
    .filter(veranstaltung => veranstaltung.object_id === AKTUELLES_ID)[0]
    .wordpress_children.filter(
      archivVeranstaltung =>
        archivVeranstaltung.object_id === AKTUELLESARCHIV_ID
    )[0].wordpress_children;

  return (
    <>
      {content && <Text>{content}</Text>}
      {archivVeranstaltungen.map(item => {
        const { object_id } = item;
        return (
          <BoxContainer margin="0" key={object_id}>
            <AktuellesPreview id={object_id} />
          </BoxContainer>
        );
      })}
    </>
  );
};

AktuellesArchivTemplate.propTypes = {
  content: PropTypes.string
};

export default AktuellesArchivTemplate;
