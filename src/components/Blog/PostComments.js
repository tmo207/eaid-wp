import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import CommentTree from './CommentTree';
import BoxContainer from '../ContentBox/BoxContainer';
import BoxElement from '../ContentBox/BoxElement';
import Headline from '../Headline';

import { unflatten } from '../../_common/func';

const PostComments = ({ postId, onAnswerClick }) => (
  <StaticQuery
    query={commentQuery}
    render={comments => {
      const associatedComments = comments.allWordpressWpComments.edges.filter(
        comment =>
          comment.node.post === postId && comment.node.status === 'approved'
      );

      const tree = unflatten(associatedComments);

      return (
        <>
          {tree.length > 0 && (
            <BoxContainer>
              <BoxElement>
                <FormattedMessage id="COMMENTS_HEADLINE">
                  {headline => <Headline margin="0">{headline}</Headline>}
                </FormattedMessage>
              </BoxElement>
              <CommentTree comments={tree} onAnswerClick={onAnswerClick} />
            </BoxContainer>
          )}
        </>
      );
    }}
  />
);

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
