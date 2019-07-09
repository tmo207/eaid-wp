import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Img = styled.div`
  background: ${props => `url(${props.src})`};
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 150px;
  width: 150px;
`;

const ImageCircle = ({ image }) => <Img src={image} className="circle" />;

Image.defaultProps = {
  aspectRatio: '1:1',
  height: 150,
  width: 150
};

Image.propTypes = {
  image: PropTypes.string.isRequired
};

export default ImageCircle;
