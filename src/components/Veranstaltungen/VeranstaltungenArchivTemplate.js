import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import VeranstaltungsPreview from './VeranstaltungsPreview';
import Text from '../Text';
import BoxContainer from '../ContentBox/BoxContainer';

import {
  VERANSTALTUNGEN_ID,
  VERANSTALTUNGEN_ARCHIV_ID
} from '../../_common/config';

const VeranstaltungenArchivTemplate = ({ content }) => (
  <>
    {content && <Text>{content}</Text>}
    <StaticQuery
      query={SubSubMenuItemsQuery}
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

VeranstaltungenArchivTemplate.propTypes = {
  content: PropTypes.string
};

export default VeranstaltungenArchivTemplate;

const SubSubMenuItemsQuery = graphql`
  query ArchivVeranstaltungen {
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
`;
