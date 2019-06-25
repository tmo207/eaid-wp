import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PADDING_SMALL } from '../_common/config';

const Text = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  padding: ${PADDING_SMALL};
  margin: 0;
  width: 35%;
  text-align: center;
`;

const DateAndAuthor = ({ children }) => {
  return <Text>{children}</Text>;
};

DateAndAuthor.propTypes = {
  children: PropTypes.node.isRequired
};

export default DateAndAuthor;
