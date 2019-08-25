import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HANDHELD_MQ, SMALL_MOBILE_TEXT, MOBILE_TEXT } from '../_common/config';

const TextWrap = styled.div`
  display: ${props => (props.inline ? 'inline' : 'block')};
  font-size: ${props => (!props.secondary ? '1.4rem' : '1rem')};
  width: ${props => (props.contentWidth ? 'auto' : '100%')};
  margin: ${props => (props.margin ? props.margin : '0 0 1rem')};
  padding: ${props => (props.padding ? props.padding : '0')};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  text-align: ${props => props.align};
  cursor: ${props => props.onClick && 'pointer'};
  color: ${props =>
    !props.secondary ? 'inherit' : 'rgba(255, 255, 255, 0.5)'};

  @${HANDHELD_MQ} {
    font-size: ${props => (!props.secondary ? MOBILE_TEXT : SMALL_MOBILE_TEXT)};
  }
`;

const Text = ({
  children,
  margin,
  padding,
  bold,
  secondary,
  align,
  inline,
  onClick,
  contentWidth
}) => {
  return (
    <TextWrap
      contentWidth={contentWidth}
      onClick={onClick}
      padding={padding}
      margin={margin}
      bold={bold}
      secondary={secondary}
      align={align}
      inline={inline}
      dangerouslySetInnerHTML={{
        __html: children
      }}
    />
  );
};

Text.defaultProps = {
  align: 'start'
};

Text.propTypes = {
  children: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  bold: PropTypes.bool,
  secondary: PropTypes.bool,
  align: PropTypes.string,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  contentWidth: PropTypes.bool
};

export default Text;
