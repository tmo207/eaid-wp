import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

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

const VeranstaltungenTemplate = ({ content }) => {
  const language = getLanguage();
  return (
    <>
      {content && <Text>{content}</Text>}
      <StaticQuery
        query={MenuItemsQuery}
        render={data => {
          const veranstaltungenID = language === 'de' ? VERANSTALTUNGEN_ID : VERANSTALTUNGEN_EN_ID;
          const veranstaltungenArchivID = language === 'de' ? VERANSTALTUNGEN_ARCHIV_ID : VERANSTALTUNGEN_ARCHIV_EN_ID;
          const veranstaltungenAll = getMenuSubFields(
            data.allWordpressWpApiMenusMenusItems.edges,
            veranstaltungenID, language
          );

          const archiv = veranstaltungenAll && veranstaltungenAll.filter(
            item => item.object_id === veranstaltungenArchivID
          )[0];

          const veranstaltungen = veranstaltungenAll && veranstaltungenAll.filter(
            item => item.object_id !== veranstaltungenArchivID
          );

          const menu = getMainMenu(data.allWordpressWpApiMenusMenusItems.edges, language);

          const archivVeranstaltungen = getMenuSubFieldsChildren(menu, veranstaltungenID, veranstaltungenArchivID);

          return (
            <>
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
        }}
      />
    </>
  );
};

VeranstaltungenTemplate.propTypes = {
  content: PropTypes.string
};

export const MenuItemsQuery = graphql`
  query Veranstaltungen {
    allWordpressWpApiMenusMenusItems {
      edges {
        node {
          wordpress_id
          items {
            object_id
            wordpress_children {
              title
              object_id
              object_slug
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
  }
`;

export default VeranstaltungenTemplate;
