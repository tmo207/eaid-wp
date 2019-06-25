import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextWrap = styled.p`
  font-size: ${props => (!props.secondary ? '1.4rem' : '1rem')};
  width: 100%;
  margin: ${props => (props.margin ? props.margin : '0 0 1rem')};
  padding: ${props => (props.padding ? props.padding : '0')};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  color: ${props =>
    !props.secondary ? 'inherit' : 'rgba(255, 255, 255, 0.5)'};
`;

const Text = ({ children, margin, padding, bold, secondary }) => {
  return (
    <TextWrap
      padding={padding}
      margin={margin}
      bold={bold}
      secondary={secondary}
      dangerouslySetInnerHTML={{
        __html: children
      }}
    />
  );
};

Text.propTypes = {
  children: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  bold: PropTypes.bool,
  secondary: PropTypes.bool
};

export default Text;
