import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import Text from '../Text';
import { getExcerpt } from '../../_common/func';

const RelatedPosts = ({ tags, postTitle }) => (
  <StaticQuery
    query={relatedPostsQuery}
    render={posts => {
      const allPosts = posts.allWordpressPost.nodes;
      const postTags = tags.map(tag => tag.name);

      const sortedPosts = allPosts
        .filter(post => post.tags)
        .map(post => ({
          title: post.title,
          excerpt: post.excerpt,
          id: post.id,
          slug: post.slug,
          tags: post.tags.filter(tag => postTags.includes(tag.name))
        }))
        .filter(post => post.tags.length && post.title !== postTitle)
        .sort((a, b) => {
          if (a.tags.length > b.tags.length) return -1;
          if (a.tags.length === b.tags.length) return 0;
          if (a.tags.length < b.tags.length) return 1;
        })
        .slice(0, 3);

      return (
        <ul>
          {sortedPosts.map(post => (
            <li key={post.id}>
              <Link to={`/${post.slug}`}>
                <Text inline bold>
                  {post.title}
                </Text>
              </Link>
              <Text inline>{getExcerpt(post.excerpt, true)}</Text>
            </li>
          ))}
        </ul>
      );
    }}
  />
);

RelatedPosts.propTypes = {
  tags: PropTypes.array,
  postTitle: PropTypes.string
};

export default RelatedPosts;

const relatedPostsQuery = graphql`
  query RelatedPosts {
    allWordpressPost {
      nodes {
        title
        excerpt
        id
        slug
        tags {
          name
        }
      }
    }
  }
`;
