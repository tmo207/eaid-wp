import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

const ImageCropped = maxWidth => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
          childImageSharp {
            fluid(maxWidth: 960, maxHeight: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Img
        imgStyle={{ maxWidth }}
        fluid={data.placeholderImage.childImageSharp.fluid}
      />
    )}
  />
);

ImageCropped.defaultProps = {
  maxWidth: 960
};

ImageCropped.propTypes = {
  maxWidth: PropTypes.number
};

export default ImageCropped;
