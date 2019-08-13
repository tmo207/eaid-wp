import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { WHITE, DARKBLUE_FONT } from '../../_common/config';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: ${props => (props.dark ? '0' : '2rem 0')};
`;

const LoadingSpinner = ({ dark }) => {
  return (
    <Wrapper dark={dark}>
      <Loader
        type="Oval"
        color={dark ? DARKBLUE_FONT : WHITE}
        height="40"
        width="40"
      />
    </Wrapper>
  );
};

LoadingSpinner.propTypes = {
  dark: PropTypes.bool
};

export default LoadingSpinner;
