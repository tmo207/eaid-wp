import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { WHITE } from '../../_common/config';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 2rem 0;
`;

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Loader type="Oval" color={WHITE} height="40" width="40" />
    </Wrapper>
  );
};

export default LoadingSpinner;
