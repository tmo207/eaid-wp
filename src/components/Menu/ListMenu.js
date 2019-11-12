import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, graphql, StaticQuery } from 'gatsby';

import {
  LIGHTBLUE_BG,
  LIGHTBLUE_HOVER,
  DARKBLUE_FONT,
  ROUNDED_CORNERS
} from '../../_common/config';
import { useMenuStateValue } from '../../_common/state';
import { getLanguage } from '../../_common/func';

const ListWrapper = styled.ul`
  color: ${DARKBLUE_FONT};
  font-weight: bold;
  list-style: none;
  margin: 0;
`;

const ListItem = styled.li`
  border-radius: ${ROUNDED_CORNERS};
  margin: 0;
  padding: 1rem 2rem;
  background-color: ${LIGHTBLUE_BG};
  display: inline-block;
  transition: 0.15s;
  &:hover {
    background-color: ${LIGHTBLUE_HOVER};
  }
`;

const ListMenu = ({ mobile }) => {
  const [{ menu }, dispatch] = useMenuStateValue();
  const { open } = menu;
  const language = getLanguage();

  return (
    <StaticQuery
      query={menuQuery}
      render={items => {
        const menus = items.allWordpressWpApiMenusMenusItems.nodes;

        const menuEN = menus.filter(menu => menu.wordpress_id === 1492)[0];
        const menuDE = menus.filter(menu => menu.wordpress_id === 6)[0];

        const menu = language === 'de' ? menuDE : menuEN;

        return (
          <ListWrapper role="navigation">
            {menu.items.map(item => (
              <div key={item.object_id}>
                <Link
                  activeClassName={mobile ? 'activeMobile' : 'active'}
                  to={item.url.replace('https://www.eaid-berlin.de', '')}
                  onClick={() =>
                    dispatch({
                      type: 'toggleMenu',
                      toggleMenuState: { open: !open }
                    })
                  }
                >
                  <ListItem
                    dangerouslySetInnerHTML={{
                      __html: item.title
                    }}
                  />
                </Link>
              </div>
            ))}
          </ListWrapper>
        );
      }}
    />
  );
};

ListMenu.propTypes = {
  mobile: false
};

ListMenu.propTypes = {
  mobile: PropTypes.bool
};

const menuQuery = graphql`
  query MenuItems {
    allWordpressWpApiMenusMenusItems {
      nodes {
        wordpress_id
        name
        items {
          title
          url
          object_id
        }
      }
    }
  }
`;

export default ListMenu;
