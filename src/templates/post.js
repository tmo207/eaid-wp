import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import BoxContainer from '../components/ContentBox/BoxContainer';

import {
  ROUNDED_CORNERS,
  HANDHELD_MQ,
  SMALL_MOBILE_TEXT
} from '../_common/config';
import BoxElement from '../components/ContentBox/BoxElement';
import Headline from '../components/Headline';
import Text from '../components/Text';
import DateAndAuthor from '../components/DateAndAuthor';
import CommentsForm from '../components/Form/CommentsForm';
import PostComments from '../components/Blog/PostComments';

const StyledImg = styled(Img)`
  border-radius: ${ROUNDED_CORNERS};
`;

const Meta = styled.span`
  padding: 0.5rem 0.25rem;

  @${HANDHELD_MQ} {
    font-size: ${SMALL_MOBILE_TEXT};
    padding: 0.25rem;
  }
`;

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  author,
  img
}) => {
  return (
    <>
      <BoxContainer margin={'2rem 0 0'}>
        {img && <StyledImg fluid={img} />}
        <BoxElement wrap lightBG>
          <Headline>{title}</Headline>
          <Text>{content}</Text>
        </BoxElement>
        {categories && categories.length && (
          <BoxElement wrap>
            <Meta>Posted in:</Meta>
            {categories.map(category => (
              <Meta key={`${category.slug}cat`}>
                <Link to={`/categories/${category.slug}/`}>
                  {category.name}
                </Link>
              </Meta>
            ))}
          </BoxElement>
        )}
        {tags && tags.length && (
          <BoxElement wrap>
            <Meta>Tagged mit:</Meta>
            {tags.map(tag => (
              <Meta key={`${tag.slug}tag`}>
                <Link to={`/tags/${tag.slug}/`}>{tag.name}</Link>
              </Meta>
            ))}
          </BoxElement>
        )}
      </BoxContainer>
      <BoxElement inline>
        <DateAndAuthor padding="0" fullWidth inline noCenter>
          <Link to={`/author/${author.slug}`}>
            {date} @{author.name}
          </Link>
        </DateAndAuthor>
      </BoxElement>
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  categories: PropTypes.array,
  tags: PropTypes.array,
  author: PropTypes.object,
  date: PropTypes.string,
  img: PropTypes.object,
  title: PropTypes.string
};

const BlogPost = ({ data }) => {
  const [answerToParentId, setAnswerToParentId] = useState(0);
  const [authorName, setAuthorName] = useState('');

  const ref = createRef();
  const executeScroll = (id, author_name) => {
    if (typeof window !== 'undefined' && ref) {
      window.scrollTo(0, ref.current.offsetTop);
    }
    setAnswerToParentId(id);
    setAuthorName(author_name);
  };
  const { wordpressPost: post } = data;
  const img = post.featured_media
    ? post.featured_media.localFile.childImageSharp.fluid
    : null;

  return (
    <>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate
        content={post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        author={post.author}
        img={img}
      />
      <PostComments postId={post.wordpress_id} onAnswerClick={executeScroll} />
      <CommentsForm
        postId={post.wordpress_id}
        ref={ref}
        answerToParentId={answerToParentId}
        answerToParentName={authorName}
        cancelAnswer={() => setAnswerToParentId(0)}
      />
    </>
  );
};

BlogPost.propTypes = {
  wordpressPost: PropTypes.object,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      slug
      content
      date(formatString: "DD.MM.YYYY")
      title
      wordpress_id
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      author {
        name
        slug
      }
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 960, maxHeight: 600) {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
`;
