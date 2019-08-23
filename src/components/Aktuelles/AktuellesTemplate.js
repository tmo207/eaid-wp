import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import BoxContainer from '../ContentBox/BoxContainer';
import PaginationContainer from '../Pagination/PaginationContainer';
import PaginationButton from '../Pagination/PaginationButton';
import AktuellesPreview from './AktuellesPreview';

import { getMenuSubFields } from '../../_common/func';
import { AKTUELLES_ID, AKTUELLESARCHIV_ID } from '../../_common/config';

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const AktuellesTemplate = () => {
  const data = useStaticQuery(graphql`
    query Aktuelles {
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
  `);
  const veranstaltungenAll = getMenuSubFields(
    data.allWordpressWpApiMenusMenusItems.edges,
    AKTUELLES_ID
  );

  const archiv = veranstaltungenAll.filter(
    item => item.object_id === AKTUELLESARCHIV_ID
  )[0];

  const veranstaltungen = veranstaltungenAll.filter(
    item => item.object_id !== AKTUELLESARCHIV_ID
  );
  return (
    <>
      <Wrapper>
        {veranstaltungen.map(item => {
          const { object_id } = item;
          return (
            <BoxContainer margin="0" key={object_id}>
              <AktuellesPreview id={object_id} />
            </BoxContainer>
          );
        })}
      </Wrapper>
      <PaginationContainer>
        <PaginationButton
          isLeft
          text={archiv.title}
          link={archiv.object_slug}
        />
      </PaginationContainer>
    </>
  );
};

export default AktuellesTemplate;
