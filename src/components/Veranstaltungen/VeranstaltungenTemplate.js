import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import VeranstaltungsPreview from './VeranstaltungsPreview';
import Text from '../Text';
import PaginationButton from '../Pagination/PaginationButton';
import PaginationContainer from '../Pagination/PaginationContainer';
import BoxContainer from '../ContentBox/BoxContainer';

import { VERANSTALTUNGEN_ARCHIV_ID } from '../../_common/config';
import { getVeranstaltungen } from '../../_common/func';

const VeranstaltungenTemplate = ({ content }) => {
  return (
    <>
      {content && <Text>{content}</Text>}
      <StaticQuery
        query={MenuItemsQuery}
        render={data => {
          const veranstaltungenAll = getVeranstaltungen(
            data.allWordpressWpApiMenusMenusItems.edges
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
                return (
                  <BoxContainer key={object_id}>
                    <VeranstaltungsPreview id={object_id} />
                  </BoxContainer>
                );
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

const MenuItemsQuery = graphql`
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
`;

export default VeranstaltungenTemplate;
