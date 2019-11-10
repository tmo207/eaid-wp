import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import PostList from '../components/Blog/PostList';

const Category = props => {
  const { data, pageContext } = props;
  const { edges: posts } = data.allWordpressPost;
  const { title: siteTitle } = data.site.siteMetadata;
  const { name: category } = pageContext;

  return (
    <>
      <Helmet title={`${category} | ${siteTitle}`} />
      <FormattedMessage id="CATEGORY_DISPLAYER">
        {message => (
          <PostList posts={posts} pageType={`${message} ${category}`} />
        )}
      </FormattedMessage>
    </>
  );
};

export default Category;

export const pageQuery = graphql`
  query CategoryPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`;
