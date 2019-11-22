import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import BoxContainer from '../ContentBox/BoxContainer';
import PaginationContainer from '../Pagination/PaginationContainer';
import PaginationButton from '../Pagination/PaginationButton';
import AktuellesPreview from './AktuellesPreview';
import { MenuItemsQuery } from '../Veranstaltungen/VeranstaltungenTemplate';

import { getMenuSubFields, getLanguage } from '../../_common/func';
import { AKTUELLES_ID, AKTUELLESARCHIV_ID, AKTUELLES_EN_ID, AKTUELLESARCHIV_EN_ID } from '../../_common/config';

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const AktuellesTemplate = () => {
  const language = getLanguage();

  const data = useStaticQuery(MenuItemsQuery);

  const aktuellesID = language === 'de' ? AKTUELLES_ID : AKTUELLES_EN_ID;
  const aktuellesArchivID = language === 'de' ? AKTUELLESARCHIV_ID : AKTUELLESARCHIV_EN_ID;

  const aktuellesAll = getMenuSubFields(
    data.allWordpressWpApiMenusMenusItems.edges,
    aktuellesID, language
  );

  const archiv = aktuellesAll && aktuellesAll.filter(
    item => item.object_id === aktuellesArchivID
  )[0];

  const aktuelles = aktuellesAll && aktuellesAll.filter(
    item => item.object_id !== aktuellesArchivID
  );
  return (
    <>
      <Wrapper>
        {!!aktuelles && aktuelles.map(item => {
          const { object_id } = item;
          return (
            <BoxContainer margin="0" key={object_id}>
              <AktuellesPreview id={object_id} />
            </BoxContainer>
          );
        })}
      </Wrapper>
      {!!archiv && (
        <PaginationContainer>
          <PaginationButton
            isLeft
            text={archiv.title}
            link={archiv.object_slug}
          />
        </PaginationContainer>
      )}
      {!archiv && !aktuelles && <FormattedMessage id="NO_NEWS" />

      }
    </>
  );
};

export default AktuellesTemplate;
