import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import logo from '../../img/arrow.png';
import {
  DARKBLUE_BG,
  DARKBLUE_FONT,
  LIGHTBLUE_BG,
  ROUNDED_CORNERS
} from '../../_common/config';

const Wrapper = styled.button`
  border-radius: ${ROUNDED_CORNERS};
  margin: 0.5rem;
  border: none;
  background: ${DARKBLUE_BG};
  color: ${DARKBLUE_FONT};
  display: flex;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: ${LIGHTBLUE_BG};
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 1rem;
  text-decoration: none;
`;

const ElementWrapper = styled.div`
  display: flex;
`;

const Arrow = styled.img`
  height: 32px;
  margin: 0;
`;

const ArrowLeft = styled(Arrow)`
  margin-right: 1rem;
  transform: rotate(90deg);
`;

const ArrowRight = styled(Arrow)`
  transform: rotate(-90deg);
  margin-left: 1rem;
`;

const Text = styled.p`
  line-height: 32px;
  margin: 0;
`;

const PaginationButton = ({ isLeft, link, text }) => {
  return (
    <Wrapper>
      <StyledLink to={`/${link}`} rel={isLeft ? 'next' : 'prev'}>
        <ElementWrapper>
          {isLeft && <ArrowLeft src={logo} />}
          <Text>{text}</Text>
          {!isLeft && <ArrowRight src={logo} />}
        </ElementWrapper>
      </StyledLink>
    </Wrapper>
  );
};

PaginationButton.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  isLeft: PropTypes.bool
};

export default PaginationButton;
