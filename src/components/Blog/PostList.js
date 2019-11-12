import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import LoadingSpinner from './LoadingSpinner';
import LazyLoadPostsWrapper from './LazyLoadPostsWrapper';

import {
  ROUNDED_CORNERS,
  DARKBLUE_BG,
  WHITE,
  DARKBLUE_FONT,
  HANDHELD_MQ,
  DESKTOP_MQ,
  SEARCH_RESULTS_DELAY
} from '../../_common/config';
import { usePostsSearch } from '../../_common/func';

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

const PostList = ({ pageType, posts }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { filteredPosts, numberOfPosts } = usePostsSearch(value, posts);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, SEARCH_RESULTS_DELAY);
    return () => clearTimeout(timer);
  }, [value]);

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
            onChange={e => {
              setIsLoading(true);
              setValue(e.target.value);
            }}
          />
        )}
      </FormattedMessage>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <LazyLoadPostsWrapper
          posts={filteredPosts}
          numberOfPosts={numberOfPosts}
        />
      )}
    </>
  );
};

PostList.defaultProps = {
  pageType: (
    <FormattedMessage id="BLOG_HEADLINE">
      {headline => headline}
    </FormattedMessage>
  )
};

PostList.propTypes = {
  pageType: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default PostList;
