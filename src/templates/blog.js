import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import PostList from '../components/Blog/PostList';

import { getRightLanguagePosts, getLanguage } from '../_common/func';

const IndexPage = ({ data }) => {
  const language = getLanguage();

  const { edges: posts } = data.allWordpressPost;

  const rightLanguagePosts = getRightLanguagePosts(posts, language);

  return (
    <>
      <Helmet>
        <title>EAID » Blog</title>
      </Helmet>
      <PostList posts={rightLanguagePosts} />
    </>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allWordpressPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`;

export default IndexPage;
