import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import PostList from '../components/Blog/PostList';

const Tag = props => {
  const { data, pageContext } = props;
  const { edges: posts } = data.allWordpressPost;
  const { title: siteTitle } = data.site.siteMetadata;
  const { name: tag } = pageContext;

  return (
    <>
      <Helmet title={`${tag} | ${siteTitle}`} />
      <FormattedMessage id="TAG_DISPLAYER">
        {message => <PostList posts={posts} pageType={`${message} ${tag}`} />}
      </FormattedMessage>
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
