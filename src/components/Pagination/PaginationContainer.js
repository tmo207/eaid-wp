import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const PaginationContainer = ({ children }) => (
  <Container role="navigation">{children}</Container>
);
PaginationContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default PaginationContainer;
