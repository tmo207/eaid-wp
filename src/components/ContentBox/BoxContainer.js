import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;

const BoxContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

BoxContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default BoxContainer;
