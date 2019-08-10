import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CommentPreview = ({
  comment,
  onAnswerClick,
  commentId,
  commentAuthor
}) => {
  const [showFull, setShowFull] = useState(false);

  return comment.length > 300 ? (
    <>
      <Text margin="0">
        {showFull ? comment : comment.slice(0, 299).concat('...')}
      </Text>
      <FlexWrap>
        <Text
          margin="0"
          secondary
          contentWidth
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? 'weniger anzeigen' : 'mehr anzeigen'}
        </Text>
        <Text
          margin="0"
          secondary
          contentWidth
          onClick={() => onAnswerClick(commentId, commentAuthor)}
        >
          antworten
        </Text>
      </FlexWrap>
    </>
  ) : (
    <>
      <Text margin="0">{comment}</Text>
      <Text
        margin="0"
        secondary
        align="end"
        onClick={() => onAnswerClick(commentId, commentAuthor)}
      >
        antworten
      </Text>
    </>
  );
};

CommentPreview.propTypes = {
  comment: PropTypes.string,
  onAnswerClick: PropTypes.func,
  commentId: PropTypes.number,
  commentAuthor: PropTypes.string
};

export default CommentPreview;
