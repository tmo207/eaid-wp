import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import VeranstaltungenPreview from './VeranstaltungenPreview';
import Text from '../Text';
import PaginationButton from '../Pagination/PaginationButton';
import PaginationContainer from '../Pagination/PaginationContainer';

import {
  VERANSTALTUNGEN_ARCHIV_ID,
  VERANSTALTUNGEN_ID
} from '../../_common/config';
import { getMainMenu, getSubPages } from '../../_common/func';

const VeranstaltungenTemplate = ({ content, id }) => {
  return (
    <>
      {content && <Text>{content}</Text>}
      <StaticQuery
        query={graphql`
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
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const mainMenu = getMainMenu(
            data.allWordpressWpApiMenusMenusItems.edges
          );

          const veranstaltungenAll = getSubPages(
            mainMenu.items,
            VERANSTALTUNGEN_ID
          );

          const archiv = veranstaltungenAll.filter(
            item => item.object_id === VERANSTALTUNGEN_ARCHIV_ID
          )[0];

          const veranstaltungen = veranstaltungenAll.filter(
            item => item.object_id !== VERANSTALTUNGEN_ARCHIV_ID
          );

          return (
            <>
              {veranstaltungen.map(item => {
                const { object_id } = item;
                return <VeranstaltungenPreview key={object_id} id={object_id} />;
              })}
              <PaginationContainer>
                <PaginationButton
                  isLeft
                  text={archiv.title}
                  link={archiv.object_slug}
                />
              </PaginationContainer>
            </>
          );
        }}
      />
    </>
  );
};

VeranstaltungenTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  id: PropTypes.number
};

export default VeranstaltungenTemplate;
