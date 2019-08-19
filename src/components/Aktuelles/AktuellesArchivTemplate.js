import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery } from 'gatsby';

import Text from '../Text';
import BoxContainer from '../ContentBox/BoxContainer';
import AktuellesPreview from './AktuellesPreview';

import { SubSubMenuItemsQuery } from '../Veranstaltungen/VeranstaltungenArchivTemplate';

import { AKTUELLES_ID, AKTUELLESARCHIV_ID } from '../../_common/config';

const AktuellesArchivTemplate = ({ content }) => {
  return (
    <>
      {content && <Text>{content}</Text>}
      <StaticQuery
        query={SubSubMenuItemsQuery}
        render={data => {
          const archivVeranstaltungen = data.allWordpressWpApiMenusMenusItems.nodes[0].items
            .filter(
              veranstaltung => veranstaltung.object_id === AKTUELLES_ID
            )[0]
            .wordpress_children.filter(
              archivVeranstaltung =>
                archivVeranstaltung.object_id === AKTUELLESARCHIV_ID
            )[0].wordpress_children;

          return (
            <>
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
        }}
      />
    </>
  );
};

AktuellesArchivTemplate.propTypes = {
  content: PropTypes.string
};

export default AktuellesArchivTemplate;
