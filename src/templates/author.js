import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import PostList from '../components/Blog/PostList';
import SearchWrapper from '../components/Blog/SearchWrapper';
import Text from '../components/Text';

const Author = props => {
  const { data } = props;
  const { authored_wordpress__POST, name } = data.wordpressWpUsers;
  const totalCount =
    (authored_wordpress__POST && authored_wordpress__POST.length) || 0;
  const { title: siteTitle } = data.site.siteMetadata;
  const title = `${totalCount} post${totalCount === 1 ? '' : 's'} by ${name}`;

  // The `authored_wordpress__POST` returns a simple array instead of an array
  // of edges / nodes. We therefore need to convert the array here.
  const posts =
    authored_wordpress__POST &&
    authored_wordpress__POST.map(post => ({
      node: post
    }));

  return (
    <>
      <Helmet title={`${name} | ${siteTitle}`} />
      {posts ? (
        <SearchWrapper pageType={`Artikel von ${name}`}>
          <PostList posts={posts} title={title} />
        </SearchWrapper>
      ) : (
        <FormattedMessage id="AUTHOR_WITHOUT_POSTS_HEADLINE">
          {message => (
            <Text align="center" margin={'2rem 0'}>
              {message}
            </Text>
          )}
        </FormattedMessage>
      )}
    </>
  );
};

export default Author;

export const pageQuery = graphql`
  query AuthorPage($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wordpressWpUsers(id: { eq: $id }) {
      name
      authored_wordpress__POST {
        ...PostListFields
      }
    }
  }
`;
