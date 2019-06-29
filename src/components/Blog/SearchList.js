import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import PostPreview from './PostPreview';
import LoadingSpinner from './LoadingSpinner';

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
    }, 1500);
    return () => clearTimeout(timer);
  }, [value]);

  const fetchMoreListItems = () => {
    setTimeout(() => {
      setResults(results => results + loadPostAmount);
      setIsFetching(false);
    }, 1000);
  };

  const filterPosts = (value, posts) => {
    const insensitiveValue = value.value.toLowerCase();

    const result = posts.filter(
      post =>
        post.node.title.toLowerCase().includes(insensitiveValue) ||
        post.node.excerpt.toLowerCase().includes(insensitiveValue) ||
        post.node.date.toLowerCase().includes(insensitiveValue) ||
        post.node.author.name.toLowerCase().includes(insensitiveValue)
    );
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
            {filteredPosts.map(post => (
              <PostPreview post={post.node} key={post.node.id} />
            ))}
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
          title
          excerpt
          author {
            name
            slug
          }
          slug
          date(formatString: "DD.MM.YYYY")
          id
        }
      }
    }
  }
`;

export default SearchList;
