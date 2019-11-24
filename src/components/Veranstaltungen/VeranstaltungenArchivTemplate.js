import React from 'react';
import PropTypes from 'prop-types';

import VeranstaltungsPreview from './VeranstaltungsPreview';
import Text from '../Text';
import BoxContainer from '../ContentBox/BoxContainer';

import {
  VERANSTALTUNGEN_ID,
  VERANSTALTUNGEN_ARCHIV_ID,
  VERANSTALTUNGEN_EN_ID,
  VERANSTALTUNGEN_ARCHIV_EN_ID
} from '../../_common/config';
import { getLanguage, getMainMenu, getMenuSubFieldsChildren } from '../../_common/func';

const VeranstaltungenArchivTemplate = ({ content, menus }) => {
  const language = getLanguage();

  const veranstaltungenID = language === 'de' ? VERANSTALTUNGEN_ID : VERANSTALTUNGEN_EN_ID;
  const veranstaltungenArchivID = language === 'de' ? VERANSTALTUNGEN_ARCHIV_ID : VERANSTALTUNGEN_ARCHIV_EN_ID;

  const menu = getMainMenu(menus.allWordpressWpApiMenusMenusItems.edges, language);

  const archivVeranstaltungen = getMenuSubFieldsChildren(menu, veranstaltungenID, veranstaltungenArchivID);

  return (
    <>
      {content && <Text>{content}</Text>}
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
};

VeranstaltungenArchivTemplate.propTypes = {
  content: PropTypes.string,
  menus: PropTypes.object.isRequired
};

export default VeranstaltungenArchivTemplate;
