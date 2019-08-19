import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import PostList from '../components/Blog/PostList';
import PaginationButton from '../components/Pagination/PaginationButton';
import PaginationContainer from '../components/Pagination/PaginationContainer';
import SearchWrapper from '../components/Blog/SearchWrapper';

class IndexPage extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { edges: posts } = data.allWordpressPost;
    const { previousPagePath, nextPagePath } = pageContext;

    return (
      <>
        <Helmet>
          <title>
            EAID » Blog
          </title>
        </Helmet>
        <SearchWrapper>
          <PostList posts={posts} />
          <PaginationContainer>
            {nextPagePath && (
              <PaginationButton
                isLeft
                link={nextPagePath}
                text="Ältere Beiträge"
              />
            )}
            {previousPagePath && (
              <PaginationButton
                link={previousPagePath}
                text="Neuere Beiträge"
              />
            )}
          </PaginationContainer>
        </SearchWrapper>
      </>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array
    })
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number
  })
};

export const pageQuery = graphql`
  query IndexQuery($limit: Int!, $skip: Int!) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`;

export default IndexPage;
