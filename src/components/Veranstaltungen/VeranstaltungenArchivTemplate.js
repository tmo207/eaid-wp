import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import VeranstaltungenPreview from './VeranstaltungenPreview';
import Text from '../Text';
import {
  VERANSTALTUNGEN_ID,
  VERANSTALTUNGEN_ARCHIV_ID
} from '../../_common/config';

const VeranstaltungenArchivTemplate = ({ content, id }) => {
  return (
    <>
      {content && <Text>{content}</Text>}
      <StaticQuery
        query={graphql`
          query ArchivVeranstaltungen {
            wordpressWpApiMenusMenusItems {
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
        `}
        render={data => {
          const archivVeranstaltungen = data.wordpressWpApiMenusMenusItems.items
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
                return <VeranstaltungenPreview key={object_id} id={object_id} />;
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
