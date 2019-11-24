import React from 'react';
import styled from 'styled-components';
import { StaticQuery } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import BoxContainer from '../ContentBox/BoxContainer';
import PaginationContainer from '../Pagination/PaginationContainer';
import PaginationButton from '../Pagination/PaginationButton';
import AktuellesPreview from './AktuellesPreview';

import { getMenuSubFields, getLanguage, getMainMenu, getMenuSubFieldsChildren } from '../../_common/func';
import { AKTUELLES_ID, AKTUELLESARCHIV_ID, AKTUELLES_EN_ID, AKTUELLESARCHIV_EN_ID } from '../../_common/config';
import { MenuItemsQuery } from '../../_common/gql';

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const AktuellesTemplate = () => {
  const language = getLanguage();

  const aktuellesID = language === 'de' ? AKTUELLES_ID : AKTUELLES_EN_ID;
  const aktuellesArchivID = language === 'de' ? AKTUELLESARCHIV_ID : AKTUELLESARCHIV_EN_ID;

  return (
    <StaticQuery
      query={MenuItemsQuery}
      render={data => {
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

        const menu = getMainMenu(data.allWordpressWpApiMenusMenusItems.edges, language);

        const aktuellesInArchiv = getMenuSubFieldsChildren(menu, aktuellesID, aktuellesArchivID);

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
            {!!archiv && !!aktuellesInArchiv && (
              <PaginationContainer>
                <PaginationButton
                  isLeft
                  text={archiv.title}
                  link={archiv.object_slug}
                />
              </PaginationContainer>
            )}
            {!aktuelles[0] && !aktuellesInArchiv && <FormattedMessage id="NO_NEWS" />}
          </>
        );
      }}
    />
  );
};

export default AktuellesTemplate;
