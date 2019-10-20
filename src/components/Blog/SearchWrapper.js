import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import SearchList from './SearchList';

import {
  ROUNDED_CORNERS,
  DARKBLUE_BG,
  WHITE,
  DARKBLUE_FONT,
  HANDHELD_MQ,
  DESKTOP_MQ
} from '../../_common/config';

const Input = styled.input`
  position: relative;
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

  @${HANDHELD_MQ} {
    width: 100%;
  }

  @${DESKTOP_MQ} {
    z-index: 50000;
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
      <FormattedMessage id="SEARCH_RESULTS_HEADLINE">
        {headline => <Headline>{!hasNoValue ? headline : pageType}</Headline>}
      </FormattedMessage>
      <FormattedMessage id="SEARCH_POST">
        {message => (
          <Input
            type="search"
            placeholder={`${message}...`}
            aria-describedby={message}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        )}
      </FormattedMessage>
      {hasNoValue ? children : <SearchList value={value} />}
    </>
  );
};

SearchWrapper.defaultProps = {
  pageType: (
    <FormattedMessage id="BLOG_HEADLINE">
      {headline => headline}
    </FormattedMessage>
  )
};

SearchWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pageType: PropTypes.string
};

export default SearchWrapper;
