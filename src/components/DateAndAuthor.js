import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  PADDING_SMALL,
  HANDHELD_MQ,
  SMALL_MOBILE_TEXT
} from '../_common/config';

const Text = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  padding: ${props => (props.padding ? props.padding : PADDING_SMALL)};
  margin: 0;
  width: ${props => (props.fullWidth ? '100%' : '35%')};
  text-align: ${props => (props.noCenter ? 'start' : 'center')};

  @${HANDHELD_MQ} {
    font-size: ${SMALL_MOBILE_TEXT};
  }
`;

const DateAndAuthor = ({ children, padding, noCenter, fullWidth }) => {
  return (
    <Text padding={padding} noCenter={noCenter} fullWidth={fullWidth}>
      {children}
    </Text>
  );
};

DateAndAuthor.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.string,
  padding: PropTypes.string,
  noCenter: PropTypes.bool,
  fullWidth: PropTypes.bool
};

export default DateAndAuthor;
