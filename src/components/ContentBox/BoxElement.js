import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  DARKBLUE_BG,
  LIGHTBLUE_BG,
  WHITE,
  ROUNDED_CORNERS
} from '../../_common/config';

const Wrapper = styled.div`
  border-radius: ${ROUNDED_CORNERS};
  background: ${props => (props.lightBG ? LIGHTBLUE_BG : DARKBLUE_BG)};
  padding: ${props => (props.noPadding ? '0' : '2rem')};
  margin-bottom: ${props => (props.noBorder ? '0' : '0.06rem')};
  flex-grow: ${props => (props.flexGrow ? props.flexGrow : '1')};
  display: flex;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  color: ${props => (props.lightBG ? '#000000' : WHITE)};
`;

const BoxElement = ({
  children,
  noBorder,
  flexGrow,
  wrap,
  noPadding,
  lightBG
}) => {
  return (
    <Wrapper
      noPadding={noPadding}
      noBorder={noBorder}
      flexGrow={flexGrow}
      wrap={wrap}
      lightBG={lightBG}
    >
      {children}
    </Wrapper>
  );
};

BoxElement.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  flexGrow: PropTypes.number,
  wrap: PropTypes.bool,
  noPadding: PropTypes.bool,
  lightBG: PropTypes.bool
};

export default BoxElement;
