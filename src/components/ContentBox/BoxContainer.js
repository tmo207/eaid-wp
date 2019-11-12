import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: ${props => (props.margin ? props.margin : '2rem 0')};
  display: flex;
  flex-direction: column;
`;

const BoxContainer = ({ children, margin }) => (
  <Container margin={margin}>{children}</Container>
);

BoxContainer.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.string
};

export default BoxContainer;
