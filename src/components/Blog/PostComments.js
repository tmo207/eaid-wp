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

const PostComments = ({ postId }) => {
  return (
    <StaticQuery
      query={commentQuery}
      render={comments => {
        const associatedComments = comments.allWordpressWpComments.edges.filter(
          comment => comment.node.post === postId
        );

        const parentComments = associatedComments.filter(
          comment => !comment.node.parent_element
        );

        return (
          <>
            {parentComments.length > 0 && (
              <BoxContainer>
                <BoxElement>
                  <Headline margin="0">Kommentare</Headline>
                </BoxElement>
                {parentComments.map(comment => {
                  const commentData = comment.node;
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
                      {associatedComments.map(
                        comment =>
                          comment.node.parent_element &&
                          comment.node.parent_element.wordpress_id ===
                            commentData.wordpress_id && (
                            <BoxElement
                              wrap
                              key={comment.node.id}
                              margin="1rem 0 0"
                            >
                              <ExtLink
                                target="_blank"
                                href={
                                  comment.node.author_url
                                    ? comment.node.author_url
                                    : null
                                }
                              >
                                <Headline>
                                  {`${comment.node.author_name} | ${comment.node.date}`}
                                </Headline>
                              </ExtLink>
                              <Text margin="0">{comment.node.content}</Text>
                            </BoxElement>
                          )
                      )}
                    </>
                  );
                  return (
                    <React.Fragment key={commentData.id}>
                      <BoxElement wrap id={commentData.id}>
                        {content}
                      </BoxElement>
                    </React.Fragment>
                  );
                })}
              </BoxContainer>
            )}
          </>
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
            wordpress_id
          }
        }
      }
    }
  }
`;
