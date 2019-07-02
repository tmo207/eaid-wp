import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';

import BoxElement from '../ContentBox/BoxElement';
import Text from '../Text';
import BoxContainer from '../ContentBox/BoxContainer';
import Headline from '../Headline';

const ExtLink = styled.a`
  text-decoration: none;
`;

const PostComments = postId => {
  return (
    <StaticQuery
      query={commentQuery}
      render={comments => {
        const associatedComments = comments.allWordpressWpComments.edges.filter(
          comment => comment.node.post === postId.postId
        );

        return (
          <BoxContainer>
            <BoxElement>
              <Headline margin="0">Kommentare</Headline>
            </BoxElement>
            {associatedComments.map(comment => {
              const commentData = comment.node;
              if (commentData.post === postId.postId) {
                const content = (
                  <>
                    <ExtLink
                      target="_blank"
                      href={
                        commentData.author_url ? commentData.author_url : null
                      }
                    >
                      <Headline>
                        {`${commentData.author_name} | ${commentData.date}`}
                      </Headline>
                    </ExtLink>
                    <Text margin="0">{commentData.content}</Text>
                  </>
                );
                return (
                  <React.Fragment key={commentData.id}>
                    <BoxElement wrap id={commentData.id}>
                      {content}
                    </BoxElement>
                  </React.Fragment>
                );
              }
            })}
          </BoxContainer>
        );
      }}
    />
  );
};

PostComments.propTypes = {
  postId: PropTypes.number
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
          parent_element {
            id
          }
        }
      }
    }
  }
`;
