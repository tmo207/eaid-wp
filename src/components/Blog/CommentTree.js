import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';
import BoxElement from '../ContentBox/BoxElement';

const CommentTree = ({ comments, onAnswerClick }) => {
  const hasChildren = comment =>
    comment.node.children_elements && comment.node.children_elements.length;
  return (
    <>
      {comments.map((comment, i) => (
        <BoxElement wrap key={i}>
          <Comment comment={comment} onAnswerClick={onAnswerClick} />
          {hasChildren(comment) && (
            <CommentTree
              onAnswerClick={onAnswerClick}
              comments={comment.node.children_elements}
            />
          )}
        </BoxElement>
      ))}
    </>
  );
};

CommentTree.propTypes = {
  comments: PropTypes.array,
  onAnswerClick: PropTypes.func
};

export default CommentTree;
