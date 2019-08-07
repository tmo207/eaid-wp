import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const Image = styled(Img)`
  border-radius: 100px;
`;

const ImageCircle = ({ imageData }) => imageData && <Image fixed={imageData} />;

ImageCircle.defaultProps = {
  aspectRatio: '1:1',
  height: 150,
  width: 150
};

ImageCircle.propTypes = {
  imageData: PropTypes.object.isRequired
};

export default ImageCircle;
