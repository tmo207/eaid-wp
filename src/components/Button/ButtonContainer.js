import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

ButtonContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ButtonContainer;
