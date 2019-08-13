import React from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery, Link } from 'gatsby';

import { WHITE, IMPRESSUM_ID, DATENSCHUTZ_ID } from '../../_common/config';

const LinksWrapper = styled.div`
  margin-bottom: 2.5rem;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 0.5rem;
  transition: 0.15s;
  &:hover {
    color: ${WHITE};
  }
`;

const FooterItems = () => {
  return (
    <StaticQuery
      query={footerItemsQuery}
      render={data => {
        const { items } = data.allWordpressWpApiMenusMenusItems.nodes[0];

        const pageItems = items.filter(
          item =>
            item.wordpress_id !== IMPRESSUM_ID &&
            item.wordpress_id !== DATENSCHUTZ_ID
        );
        const infoItems = items.filter(
          item =>
            item.wordpress_id === IMPRESSUM_ID ||
            item.wordpress_id === DATENSCHUTZ_ID
        );

        return (
          <>
            <LinksWrapper>
              {pageItems.map(item => (
                <StyledLink
                  key={item.wordpress_id}
                  to={item.url.replace('https://www.eaid-berlin.de', '')}
                  dangerouslySetInnerHTML={{
                    __html: item.title
                  }}
                />
              ))}
            </LinksWrapper>
            <LinksWrapper>
              {infoItems.map(item => (
                <StyledLink
                  key={item.wordpress_id}
                  to={item.url.replace('https://www.eaid-berlin.de', '')}
                  dangerouslySetInnerHTML={{
                    __html: item.title
                  }}
                />
              ))}
            </LinksWrapper>
          </>
        );
      }}
    />
  );
};

export default FooterItems;

const footerItemsQuery = graphql`
  query footerItemsQuery {
    allWordpressWpApiMenusMenusItems(filter: { wordpress_id: { eq: 729 } }) {
      nodes {
        items {
          title
          wordpress_id
          url
        }
      }
    }
  }
`;
