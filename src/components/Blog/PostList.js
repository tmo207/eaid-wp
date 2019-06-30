import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import PostPreview from './PostPreview';

const IndexPage = posts => {
  return (
    <>
      {posts.posts.map(({ node: post }) => (
        <PostPreview post={post} key={post.id} />
      ))}
    </>
  );
};

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default IndexPage;

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    author {
      name
      slug
    }
    date(formatString: "DD.MM.YYYY")
    slug
    featured_media {
      localFile {
        childImageSharp {
          fluid(maxWidth: 960, maxHeight: 600) {
            base64
            tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
            presentationWidth
            presentationHeight
          }
        }
      }
    }
  }
`;
