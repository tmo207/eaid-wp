import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import logo from '../../img/arrow.png';
import {
  DARKBLUE_BG,
  DARKBLUE_FONT,
  LIGHTBLUE_BG,
  ROUNDED_CORNERS
} from '../../_common/config';

const Container = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

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

const Pagination = ({ pageContext, pathPrefix }) => {
  const { previousPagePath, nextPagePath } = pageContext;

  return (
    <Container role="navigation">
      {nextPagePath && (
        <Wrapper>
          <StyledLink to={nextPagePath} rel="next">
            <ElementWrapper>
              <ArrowLeft src={logo} />
              <Text>Ältere Beiträge</Text>
            </ElementWrapper>
          </StyledLink>
        </Wrapper>
      )}
      {previousPagePath && (
        <Wrapper>
          <StyledLink to={previousPagePath} rel="prev">
            <ElementWrapper>
              <Text>Neuere Beiträge</Text>
              <ArrowRight src={logo} />
            </ElementWrapper>
          </StyledLink>
        </Wrapper>
      )}
    </Container>
  );
};

export default Pagination;
