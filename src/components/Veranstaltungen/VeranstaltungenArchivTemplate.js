import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import VeranstaltungsPreview from './VeranstaltungsPreview';
import Text from '../Text';
import {
  VERANSTALTUNGEN_ID,
  VERANSTALTUNGEN_ARCHIV_ID
} from '../../_common/config';
import BoxContainer from '../ContentBox/BoxContainer';

const VeranstaltungenArchivTemplate = ({ content }) => {
  return (
    <>
      {content && <Text>{content}</Text>}
      <StaticQuery
        query={graphql`
          query ArchivVeranstaltungen {
            allWordpressWpApiMenusMenusItems(
              filter: { wordpress_id: { eq: 6 } }
            ) {
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
        `}
        render={data => {
          const archivVeranstaltungen = data.allWordpressWpApiMenusMenusItems.nodes[0].items
            .filter(
              veranstaltung => veranstaltung.object_id === VERANSTALTUNGEN_ID
            )[0]
            .wordpress_children.filter(
              archivVeranstaltung =>
                archivVeranstaltung.object_id === VERANSTALTUNGEN_ARCHIV_ID
            )[0].wordpress_children;

          return (
            <>
              {archivVeranstaltungen.map(item => {
                const { object_id } = item;
                return (
                  <BoxContainer key={object_id}>
                    <VeranstaltungsPreview id={object_id} />
                  </BoxContainer>
                );
              })}
            </>
          );
        }}
      />
    </>
  );
};

VeranstaltungenArchivTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  id: PropTypes.number
};

export default VeranstaltungenArchivTemplate;
