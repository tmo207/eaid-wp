import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import Text from '../Text';

const Email = styled.a`
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const FooterContact = () => {
  return (
    <StaticQuery
      query={footerContactQuery}
      render={data => {
        const { kontakttext, email } = data.allWordpressPage.edges[0].node.acf;
        return (
          <>
            <Text secondary>{kontakttext}</Text>
            <Email
              href={`mailto:${email}`}
              className="noLine"
              dangerouslySetInnerHTML={{
                __html: email
              }}
            />
          </>
        );
      }}
    />
  );
};

FooterContact.propTypes = {};

export default FooterContact;

const footerContactQuery = graphql`
  query footerContactQuery {
    allWordpressPage(filter: { path: { eq: "/" } }) {
      edges {
        node {
          acf {
            kontakttext
            email
          }
        }
      }
    }
  }
`;
