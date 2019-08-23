import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import Text from '../Text';

const Email = styled.a`
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const FooterContact = () => {
  const data = useStaticQuery(footerContactQuery);
  return (
    <>
      {data.allWordpressPage &&
        data.allWordpressPage.edges &&
        data.allWordpressPage.edges[0] &&
        data.allWordpressPage.edges[0].node &&
        data.allWordpressPage.edges[0].node.acf && (
          <>
            <Text secondary>
              {data.allWordpressPage.edges[0].node.acf.kontakttext}
            </Text>
            <Email
              href={`mailto:${data.allWordpressPage.edges[0].node.acf.email}`}
              className="noLine"
              dangerouslySetInnerHTML={{
                __html: data.allWordpressPage.edges[0].node.acf.email
              }}
            />
          </>
        )}
    </>
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
