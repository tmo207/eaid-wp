import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: red;
  font-size: 1rem;
`;

const Error = ({ children }) => {
  return (
    <Wrapper
      dangerouslySetInnerHTML={{
        __html: children
      }}
    />
  );
};

Error.propTypes = {
  children: PropTypes.node.isRequired
};

export default Error;
