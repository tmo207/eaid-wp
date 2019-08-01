import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchList from './SearchList';

import {
  ROUNDED_CORNERS,
  DARKBLUE_BG,
  WHITE,
  DARKBLUE_FONT
} from '../../_common/config';

const Input = styled.input`
  display: block;
  border: none;
  border-radius: ${ROUNDED_CORNERS};
  background: ${DARKBLUE_BG};
  color: ${WHITE};
  padding: 0.5rem 1rem;
  width: 70%;
  margin: 0 auto;
  transition: width 0.2s;

  &:focus {
    width: 100%;
  }

  &::placeholder {
    font-weight: bold;
    color: ${DARKBLUE_FONT};
    text-align: center;
  }

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const Headline = styled.h1`
  text-align: center;
`;

const SearchWrapper = ({ children, pageType }) => {
  const [value, setValue] = useState('');
  const hasNoValue = value === '';
  return (
    <>
      <Headline>{!hasNoValue ? 'Suchergebnisse' : pageType}</Headline>
      <Input
        type="search"
        placeholder="Durchsuche Artikel..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {hasNoValue ? children : <SearchList value={value} />}
    </>
  );
};

SearchWrapper.defaultProps = {
  pageType: 'Neuste Artikel'
};

SearchWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pageType: PropTypes.string
};

export default SearchWrapper;
