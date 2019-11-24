import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery } from 'gatsby';

import Text from '../Text';
import BoxContainer from '../ContentBox/BoxContainer';
import AktuellesPreview from './AktuellesPreview';

import { AKTUELLES_ID, AKTUELLESARCHIV_ID, AKTUELLES_EN_ID, AKTUELLESARCHIV_EN_ID } from '../../_common/config';
import { getLanguage, getMainMenu, getMenuSubFieldsChildren } from '../../_common/func';
import { MenuItemsQuery } from '../../_common/gql';

const AktuellesArchivTemplate = ({ content }) => {
  const language = getLanguage();

  const aktuellesID = language === 'de' ? AKTUELLES_ID : AKTUELLES_EN_ID;
  const aktuellesArchivID = language === 'de' ? AKTUELLESARCHIV_ID : AKTUELLESARCHIV_EN_ID;

  return (
    <StaticQuery
      query={MenuItemsQuery}
      render={data => {
        const menu = getMainMenu(data.allWordpressWpApiMenusMenusItems.edges, language);

        const archivAktuelles = getMenuSubFieldsChildren(menu, aktuellesID, aktuellesArchivID);

        return (
          <>
            {content && <Text>{content}</Text>}
            {!!archivAktuelles && archivAktuelles.map(item => {
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
  );
};

AktuellesArchivTemplate.propTypes = {
  content: PropTypes.string
};

export default AktuellesArchivTemplate;
