import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import {
  PADDING_SMALL,
  WHITE,
  YELLOW,
  LIGHTBLUE_BG,
  LIGHTBLUE_HOVER,
  DARKBLUE_FONT,
  ROUNDED_CORNERS,
  HANDHELD_MQ,
  MOBILE_TEXT
} from '../../_common/config';

const ButtonStyle = styled.button`
  border-radius: ${ROUNDED_CORNERS};
  ${props => props.flexGrow && `display: flex; flex-grow: ${props.flexGrow};`}
  padding: 0;
  font-weight: bold;
  color: ${DARKBLUE_FONT};
  flex-grow: 1;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${LIGHTBLUE_HOVER};
  }

  @${HANDHELD_MQ} {
    font-size: ${MOBILE_TEXT};
  }
`;
const YellowButton = styled(ButtonStyle)`
  background: ${YELLOW};
`;
const WhiteButton = styled(ButtonStyle)`
  background: ${WHITE};
`;
const GreyButton = styled(ButtonStyle)`
  background: ${LIGHTBLUE_BG};
`;

const StyledLink = styled(Link)`
  padding: ${PADDING_SMALL};
  display: block;
  text-decoration: none;
`;

const selectButton = type => {
  switch (type) {
    case 'Yellow':
      return YellowButton;
    case 'White':
      return WhiteButton;
    case 'Grey':
      return GreyButton;
  }
};

const Button = ({ type, children, flexGrow, to }) => {
  const RenderButton = selectButton(type);

  if (to) {
    return (
      <RenderButton tabIndex="-1" flexGrow={flexGrow}>
        <StyledLink
          to={to}
          dangerouslySetInnerHTML={{
            __html: children
          }}
        />
      </RenderButton>
    );
  }
  return <RenderButton flexGrow={flexGrow}>{children}</RenderButton>;
};

Button.propTypes = {
  type: PropTypes.oneOf(['Yellow', 'White', 'Grey']).isRequired,
  children: PropTypes.node.isRequired,
  flexGrow: PropTypes.number,
  to: PropTypes.string
};

export default Button;
