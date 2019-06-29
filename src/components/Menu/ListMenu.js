import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import {
  LIGHTBLUE_BG,
  LIGHTBLUE_HOVER,
  DARKBLUE_FONT,
  ROUNDED_CORNERS
} from '../../_common/config';

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
  return (
    <ListWrapper role="navigation">
      <div>
        <Link
          activeClassName={mobile.mobile ? 'activeMobile' : 'active'}
          to="/"
        >
          <ListItem>Start</ListItem>
        </Link>
      </div>
      <div>
        <Link activeClassName={mobile.mobile ? 'activeMobile' : 'active'} to="">
          <ListItem>Der Verein</ListItem>
        </Link>
      </div>
      <div>
        <Link activeClassName={mobile.mobile ? 'activeMobile' : 'active'} to="">
          <ListItem>Blog</ListItem>
        </Link>
      </div>
      <div>
        <Link activeClassName={mobile.mobile ? 'activeMobile' : 'active'} to="">
          <ListItem>Veranstaltungen</ListItem>
        </Link>
      </div>
      <div>
        <Link activeClassName={mobile.mobile ? 'activeMobile' : 'active'} to="">
          <ListItem>Publikationen</ListItem>
        </Link>
      </div>
    </ListWrapper>
  );
};

ListMenu.propTypes = {
  mobile: false
};

ListMenu.propTypes = {
  mobile: PropTypes.bool
};

export default ListMenu;
