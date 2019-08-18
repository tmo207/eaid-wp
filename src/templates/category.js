import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import PostList from '../components/Blog/PostList';
import SearchWrapper from '../components/Blog/SearchWrapper';

const Category = props => {
  const { data, pageContext } = props;
  const { edges: posts, totalCount } = data.allWordpressPost;
  const { title: siteTitle } = data.site.siteMetadata;
  const { name: category } = pageContext;
  const title = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } in der “${category}” Kategorie`;

  return (
    <>
      <Helmet title={`${category} | ${siteTitle}`} />
      <SearchWrapper pageType={`Artikel der Kategorie: ${category}`}>
        <PostList posts={posts} title={title} />
      </SearchWrapper>
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
