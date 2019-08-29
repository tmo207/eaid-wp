import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';

const Image = styled(BackgroundImage)`
  border-radius: 100px;
  overflow: hidden;
`;

const ImageCircle = ({ imageData }) =>
  imageData && <Image Tag="div" fixed={imageData} />;

ImageCircle.defaultProps = {
  aspectRatio: '1:1',
  height: 150,
  width: 150
};

ImageCircle.propTypes = {
  imageData: PropTypes.object.isRequired
};

export default ImageCircle;
