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
import { useStateValue } from '../../_common/state';

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

const ListMenu = mobile => {
  const [{ menu }, dispatch] = useStateValue();
  const { open } = menu;

  return (
    <StaticQuery
      query={menuQuery}
      render={items => {
        return (
          <ListWrapper role="navigation">
            {items.wordpressWpApiMenusMenusItems.items.map(item => {
              return (
                <div key={item.object_id}>
                  <Link
                    activeClassName={mobile.mobile ? 'activeMobile' : 'active'}
                    to={item.url.replace('https://www.eaid-berlin.de', '')}
                    onClick={() =>
                      dispatch({
                        type: 'toggleMenu',
                        toggleMenuState: { open: !open }
                      })
                    }
                  >
                    <ListItem>{item.title}</ListItem>
                  </Link>
                </div>
              );
            })}
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
    wordpressWpApiMenusMenusItems {
      items {
        title
        url
        object_id
      }
    }
  }
`;

export default ListMenu;
