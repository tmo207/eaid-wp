import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import VeranstaltungsPreview from './VeranstaltungsPreview';
import Text from '../Text';
import PaginationButton from '../Pagination/PaginationButton';
import PaginationContainer from '../Pagination/PaginationContainer';
import BoxContainer from '../ContentBox/BoxContainer';

import {
  VERANSTALTUNGEN_ARCHIV_ID,
  VERANSTALTUNGEN_ID,
  VERANSTALTUNGEN_EN_ID,
  VERANSTALTUNGEN_ARCHIV_EN_ID
} from '../../_common/config';
import { getMenuSubFields, getLanguage, getMainMenu, getMenuSubFieldsChildren } from '../../_common/func';

const VeranstaltungenTemplate = ({ content, menus }) => {
  const language = getLanguage();

  const veranstaltungenID = language === 'de' ? VERANSTALTUNGEN_ID : VERANSTALTUNGEN_EN_ID;
  const veranstaltungenArchivID = language === 'de' ? VERANSTALTUNGEN_ARCHIV_ID : VERANSTALTUNGEN_ARCHIV_EN_ID;
  const veranstaltungenAll = getMenuSubFields(
    menus.allWordpressWpApiMenusMenusItems.edges,
    veranstaltungenID, language
  );

  const archiv = veranstaltungenAll && veranstaltungenAll.filter(
    item => item.object_id === veranstaltungenArchivID
  )[0];

  const veranstaltungen = veranstaltungenAll && veranstaltungenAll.filter(
    item => item.object_id !== veranstaltungenArchivID
  );

  const menu = getMainMenu(menus.allWordpressWpApiMenusMenusItems.edges, language);

  const archivVeranstaltungen = getMenuSubFieldsChildren(menu, veranstaltungenID, veranstaltungenArchivID);

  return (
    <>
      {content && <Text>{content}</Text>}

      {!!veranstaltungen && veranstaltungen.map(item => {
        const { object_id } = item;
        return (
          <BoxContainer key={object_id}>
            <VeranstaltungsPreview id={object_id} />
          </BoxContainer>
        );
      })}
      {!!archiv && !!archivVeranstaltungen && (
        <PaginationContainer>
          <PaginationButton
            isLeft
            text={archiv.title}
            link={archiv.object_slug}
          />
        </PaginationContainer>
      )}
      {!veranstaltungen[0] && !archivVeranstaltungen && <FormattedMessage id="NO_EVENTS_FOUND" />}
    </>
  );
};

VeranstaltungenTemplate.propTypes = {
  content: PropTypes.string
};


export default VeranstaltungenTemplate;
