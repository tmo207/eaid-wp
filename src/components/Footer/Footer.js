import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import ImageFull from '../Image/ImageFull';
import Text from '../Text';

import { WHITE, DARKBLUE_FONT } from '../../_common/config';

const FooterContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 1rem;
  color: ${DARKBLUE_FONT};
`;

const ElementWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 3rem;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const FooterChild = styled.div`
  padding: 1rem;
  width: ${props => (props.logos ? '15rem' : 'auto')};
  max-width: 100%;
  margin-right: 2rem;
`;

const LinksWrapper = styled.div`
  margin-bottom: 2.5rem;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 0.5rem;
  transition: 0.15s;
  &:hover {
    color: ${WHITE};
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <ElementWrapper>
        <FooterChild logos>
          <Text>In Kooperation mit</Text>
          <ImageFull />
          <ImageFull />
        </FooterChild>
        <FooterChild>
          <LinksWrapper>
            <StyledLink to="">Der Verein</StyledLink>
            <StyledLink to="">Blog</StyledLink>
            <StyledLink to="">Veranstaltungen</StyledLink>
            <StyledLink to="">Publikationen</StyledLink>
            <StyledLink to="">Beitragsordnung & Satzung</StyledLink>
          </LinksWrapper>
          <LinksWrapper>
            <StyledLink to="">Impressum</StyledLink>
            <StyledLink to="">Datenschutz</StyledLink>
          </LinksWrapper>
        </FooterChild>
      </ElementWrapper>
    </FooterContainer>
  );
};

export default Footer;
