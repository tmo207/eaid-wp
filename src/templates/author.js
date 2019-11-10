import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import PostList from '../components/Blog/PostList';
import Text from '../components/Text';

import { getRightLanguagePosts } from '../_common/func';
import { useLanguageStateValue } from '../_common/state';

const Author = props => {
  const [{ language }] = useLanguageStateValue();

  const { data } = props;
  const { authored_wordpress__POST, name } = data.wordpressWpUsers;
  const { title: siteTitle } = data.site.siteMetadata;

  // The `authored_wordpress__POST` returns a simple array instead of an array
  // of edges / nodes. We therefore need to convert the array here.
  const posts =
    authored_wordpress__POST &&
    authored_wordpress__POST.map(post => ({
      node: post
    }));

  const rightLanguagePosts = getRightLanguagePosts(posts, language);

  return (
    <>
      <Helmet title={`${name} | ${siteTitle}`} />
      {rightLanguagePosts ? (
        <PostList posts={rightLanguagePosts} pageType={`Artikel von ${name}`} />
      ) : (
        <FormattedMessage id="AUTHOR_WITHOUT_POSTS_HEADLINE">
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
