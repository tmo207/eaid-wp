import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery } from 'gatsby';

import VeranstaltungsPreview from './VeranstaltungsPreview';
import Text from '../Text';
import BoxContainer from '../ContentBox/BoxContainer';
import { MenuItemsQuery } from './VeranstaltungenTemplate';

import {
  VERANSTALTUNGEN_ID,
  VERANSTALTUNGEN_ARCHIV_ID,
  VERANSTALTUNGEN_EN_ID,
  VERANSTALTUNGEN_ARCHIV_EN_ID
} from '../../_common/config';
import { getLanguage, getMainMenu, getMenuSubFieldsChildren } from '../../_common/func';

const VeranstaltungenArchivTemplate = ({ content }) => {
  const language = getLanguage();

  const veranstaltungenID = language === 'de' ? VERANSTALTUNGEN_ID : VERANSTALTUNGEN_EN_ID;
  const veranstaltungenArchivID = language === 'de' ? VERANSTALTUNGEN_ARCHIV_ID : VERANSTALTUNGEN_ARCHIV_EN_ID;

  return (
    <>
      {content && <Text>{content}</Text>}
      <StaticQuery
        query={MenuItemsQuery}
        render={data => {
          const menu = getMainMenu(data.allWordpressWpApiMenusMenusItems.edges, language);

          const archivVeranstaltungen = getMenuSubFieldsChildren(menu, veranstaltungenID, veranstaltungenArchivID);

          return (
            <>
              {!!archivVeranstaltungen && archivVeranstaltungen.map(item => {
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
  content: PropTypes.string
};

export default VeranstaltungenArchivTemplate;
