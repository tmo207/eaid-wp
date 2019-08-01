import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostList from '../components/Blog/PostList';
import SearchWrapper from '../components/Blog/SearchWrapper';

const Tag = props => {
  const { data, pageContext } = props;
  const { edges: posts, totalCount } = data.allWordpressPost;
  const { title: siteTitle } = data.site.siteMetadata;
  const { name: tag } = pageContext;
  const title = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } mit dem Tag ${tag}`;

  return (
    <>
      <Helmet title={`${tag} | ${siteTitle}`} />
      <SearchWrapper pageType={`Artikel mit Tag: ${tag}`}>
        <PostList posts={posts} title={title} />
      </SearchWrapper>
    </>
  );
};

export default Tag;

export const pageQuery = graphql`
  query TagPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`;
