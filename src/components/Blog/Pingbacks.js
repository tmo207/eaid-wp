import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import BoxElement from '../ContentBox/BoxElement';

import { HANDHELD_MQ, SMALL_MOBILE_TEXT } from '../../_common/config';

const List = styled.ul`
  margin-bottom: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0;
  padding: 0.5rem 0.25rem;

  @${HANDHELD_MQ} {
    font-size: ${SMALL_MOBILE_TEXT};
    padding: 0.25rem;
  }
`;

const Meta = styled.span`
  padding: 0.5rem 0.25rem;

  @${HANDHELD_MQ} {
    font-size: ${SMALL_MOBILE_TEXT};
    padding: 0.25rem;
  }
`;

const Pingbacks = ({ postId }) => {
  return (
    <StaticQuery
      query={pingbackQuery}
      render={pings => {
        const postPings = pings.allWordpressWpPingbacks.edges
          .filter(ping => {
            return (
              parseInt(ping.node.comment_post_ID) === postId &&
              ping.node.comment_approved === '1'
            );
          })
          .reverse();

        return (
          <>
            {postPings.length > 0 && (
              <BoxElement column>
                <Meta>Pingbacks:</Meta>
                <List>
                  {postPings.map(ping => (
                    <ListItem key={ping.node.id}>
                      <a
                        href={ping.node.comment_author_url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Meta
                          dangerouslySetInnerHTML={{
                            __html: ping.node.comment_author
                          }}
                        />
                      </a>
                    </ListItem>
                  ))}
                </List>
              </BoxElement>
            )}
          </>
        );
      }}
    />
  );
};

Pingbacks.propTypes = {
  postId: PropTypes.number
};

export default Pingbacks;

const pingbackQuery = graphql`
  query PingbackQuery {
    allWordpressWpPingbacks {
      edges {
        node {
          id
          comment_author_url
          comment_approved
          comment_post_ID
          comment_author
        }
      }
    }
  }
`;
