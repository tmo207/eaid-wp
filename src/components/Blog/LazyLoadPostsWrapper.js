import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import PostPreview from './PostPreview';
import Text from '../Text';

const LazyLoadPostsWrapper = ({ posts, numberOfPosts }) => {
  const loadPostAmount = 10;
  const [numberOfResultsShowing, setResults] = useState(loadPostAmount);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1100
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  useEffect(() => {
    setResults(loadPostAmount);
  }, [posts]);

  const fetchMoreListItems = () => {
    setResults(results => results + loadPostAmount);
    setIsFetching(false);
  };

  const renderedPosts = posts.slice(0, numberOfResultsShowing);

  return (
    <>
      {numberOfPosts > 0 ? (
        renderedPosts.map(post => (
          <PostPreview post={post.node} key={post.node.id} />
        ))
      ) : (
        <FormattedMessage id="NO_SEARCH_RESULTS">
          {message => (
            <Text align="center" margin="2rem 0">
              {message}
            </Text>
          )}
        </FormattedMessage>
      )}
    </>
  );
};

LazyLoadPostsWrapper.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  numberOfPosts: PropTypes.number
};

export default LazyLoadPostsWrapper;
