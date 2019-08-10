import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Headline from '../Headline';
import CommentPreview from './CommentPreview';

const ExtLink = styled.a`
  text-decoration: none;
`;

const Comment = ({ comment, onAnswerClick }) => (
  <>
    <ExtLink
      target="_blank"
      href={comment.node.author_url ? comment.node.author_url : null}
    >
      <Headline>
        {`${comment.node.author_name} | ${comment.node.date}`}
      </Headline>
    </ExtLink>
    <CommentPreview
      comment={comment.node.content}
      onAnswerClick={onAnswerClick}
      commentId={comment.node.wordpress_id}
      commentAuthor={comment.node.author_name}
    />
  </>
);

Comment.propTypes = {
  comment: PropTypes.object,
  onAnswerClick: PropTypes.func
};

export default Comment;
