import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const Image = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          placeholderImage: file(relativePath: { eq: "schaar.jpg" }) {
            childImageSharp {
              fixed(width: 150, height: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => {
        const imageData = data.placeholderImage.childImageSharp.fixed;
        return <BackgroundImage fixed={imageData} className="circle" />;
      }}
    />
  );
};

const ImageCircle = styled(Image)`
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default ImageCircle;
