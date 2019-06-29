import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostList from '../components/Blog/PostList'
import Pagination from '../components/Blog/Pagination'
import SearchList from '../components/Blog/SearchList'

import {
  DARKBLUE_BG,
  WHITE,
  DARKBLUE_FONT,
  ROUNDED_CORNERS,
} from '../_common/config'

const Input = styled.input`
  display: block;
  border: none;
  border-radius: ${ROUNDED_CORNERS};
  background: ${DARKBLUE_BG};
  color: ${WHITE};
  padding: 0.5rem 1rem;
  width: 70%;
  margin: 0 auto;
  transition: width 0.2s;

  &:focus {
    width: 100%;
  }

  &::placeholder {
    font-weight: bold;
    color: ${DARKBLUE_FONT};
    text-align: center;
  }
`

class IndexPage extends React.Component {
  state = { value: '' }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { value } = this.state
    const { data, pageContext } = this.props
    const { edges: posts } = data.allWordpressPost

    return (
      <Layout>
        <Input
          type="search"
          placeholder="Durchsuche Artikel..."
          value={value}
          onChange={this.onChange}
        />
        {value === '' ? (
          <>
            <PostList posts={posts} />
            <Pagination pageContext={pageContext} pathPrefix="/" />
          </>
        ) : (
          <SearchList value={value} />
        )}
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }),
}

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
`

export default IndexPage
