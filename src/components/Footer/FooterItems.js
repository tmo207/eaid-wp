import React from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery, Link } from 'gatsby';

import {
  WHITE,
  IMPRESSUM_ID,
  DATENSCHUTZ_ID,
  IMPRESSUM_ID_EN,
  DATENSCHUTZ_ID_EN
} from '../../_common/config';
import { useLanguageStateValue } from '../../_common/state';

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
  const [{ language }] = useLanguageStateValue();

  return (
    <StaticQuery
      query={footerItemsQuery}
      render={data => {
        const { nodes: menus } = data.allWordpressWpApiMenusMenusItems;
        const menuDE = menus.filter(menu => menu.wordpress_id === 729)[0];
        const menuEN = menus.filter(menu => menu.wordpress_id === 1494)[0];

        let items = [];
        let pageItems = [];
        let infoItems = [];

        if (language !== 'de') {
          // eslint-disable-next-line prefer-destructuring
          items = menuEN.items;
          pageItems = items.filter(
            item =>
              item.wordpress_id !== IMPRESSUM_ID_EN &&
              item.wordpress_id !== DATENSCHUTZ_ID_EN
          );
          infoItems = items.filter(
            item =>
              item.wordpress_id === IMPRESSUM_ID_EN ||
              item.wordpress_id === DATENSCHUTZ_ID_EN
          );
        } else {
          // eslint-disable-next-line prefer-destructuring
          items = menuDE.items;
          pageItems = items.filter(
            item =>
              item.wordpress_id !== IMPRESSUM_ID &&
              item.wordpress_id !== DATENSCHUTZ_ID
          );
          infoItems = items.filter(
            item =>
              item.wordpress_id === IMPRESSUM_ID ||
              item.wordpress_id === DATENSCHUTZ_ID
          );
        }

        return (
          <>
            <LinksWrapper>
              {pageItems &&
                pageItems.map(item => (
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
              {infoItems &&
                infoItems.map(item => (
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
    allWordpressWpApiMenusMenusItems {
      nodes {
        name
        wordpress_id
        items {
          title
          wordpress_id
          url
        }
      }
    }
  }
`;
