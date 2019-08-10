import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

import CommentTree from './CommentTree';

import { unflatten } from '../../_common/func';

const PostComments = ({ postId, onAnswerClick }) => {
  return (
    <StaticQuery
      query={commentQuery}
      render={comments => {
        const associatedComments = comments.allWordpressWpComments.edges.filter(
          comment =>
            comment.node.post === postId && comment.node.status === 'approved'
        );

        const tree = unflatten(associatedComments);

        return <CommentTree comments={tree} onAnswerClick={onAnswerClick} />;
      }}
    />
  );
};

PostComments.propTypes = {
  postId: PropTypes.number,
  onAnswerClick: PropTypes.func
};

export default PostComments;

const commentQuery = graphql`
  query CommentsQuery {
    allWordpressWpComments {
      edges {
        node {
          id
          wordpress_id
          post
          author_name
          author_url
          date(formatString: "DD.MM.YYYY")
          content
          status
          parent_element {
            wordpress_id
          }
        }
      }
    }
  }
`;
