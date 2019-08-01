import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import PostPreview from './PostPreview';
import LoadingSpinner from './LoadingSpinner';
import Text from '../Text';

import {
  SEARCH_RESULTS_DELAY,
  FETCH_MORE_ITEMS_DELAY
} from '../../_common/config';
import { toLowerCaseArray } from '../../_common/func';

const SearchList = value => {
  const loadPostAmount = 10;
  const [numberOfResultsShowing, setResults] = useState(loadPostAmount);
  const [resultsTotalLength, setResultLength] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 600
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
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, SEARCH_RESULTS_DELAY);
    return () => clearTimeout(timer);
  }, [value]);

  const fetchMoreListItems = () => {
    setTimeout(() => {
      setResults(results => results + loadPostAmount);
      setIsFetching(false);
    }, FETCH_MORE_ITEMS_DELAY);
  };

  const filterPosts = ({ value }, posts) => {
    const searchValueArray = toLowerCaseArray(value).filter(el => el !== '');

    const result = posts.filter(post => {
      const { title, excerpt, date, author } = post.node;

      const contentArray = toLowerCaseArray(title).concat(
        toLowerCaseArray(excerpt),
        toLowerCaseArray(date),
        toLowerCaseArray(author.name)
      );

      const isSubstringIncluded = string =>
        contentArray.find(contentElement => contentElement.includes(string));

      return searchValueArray.every(isSubstringIncluded);
    });
    setResultLength(result.length);
    return result;
  };

  return (
    <StaticQuery
      query={allPostsQuery}
      render={posts => {
        const filteredPosts = filterPosts(
          value,
          posts.allWordpressPost.edges
        ).slice(0, numberOfResultsShowing);

        return isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {resultsTotalLength > 0 ? (
              filteredPosts.map(post => (
                <PostPreview post={post.node} key={post.node.id} />
              ))
            ) : (
              <Text center margin={'2rem 0'}>
                Keine passenden Ergebnisse.
              </Text>
            )}
            {isFetching && resultsTotalLength > numberOfResultsShowing && (
              <LoadingSpinner />
            )}
          </>
        );
      }}
    />
  );
};

SearchList.propTypes = {
  value: PropTypes.string
};

const allPostsQuery = graphql`
  query allPostsSearch {
    allWordpressPost {
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`;

export default SearchList;
