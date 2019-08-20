import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import BoxContainer from '../components/ContentBox/BoxContainer';
import BoxElement from '../components/ContentBox/BoxElement';
import Headline from '../components/Headline';
import Text from '../components/Text';
import DateAndAuthor from '../components/DateAndAuthor';
import CommentsForm from '../components/Form/CommentsForm';
import PostComments from '../components/Blog/PostComments';
import RelatedPosts from '../components/Blog/RelatedPosts';
import Pingbacks from '../components/Blog/Pingbacks';

import {
  ROUNDED_CORNERS,
  HANDHELD_MQ,
  SMALL_MOBILE_TEXT,
  MOBILE_TEXT,
  DARKBLUE_BG,
  WHITE,
  DARKBLUE_FONT,
  DESKTOP_MQ,
  PADDING_SMALL
} from '../_common/config';

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

const StyledLink = styled.span`
  padding: ${PADDING_SMALL};
  display: block;
  text-decoration: none;
`;

const BackButton = styled.button`
  left: 0;
  position: fixed;
  border-radius: ${ROUNDED_CORNERS};
  padding: 0;
  font-weight: bold;
  color: ${WHITE};
  background: ${DARKBLUE_BG};
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${DARKBLUE_FONT};
  }

  @${HANDHELD_MQ} {
    font-size: ${MOBILE_TEXT};
  }

  @${DESKTOP_MQ} {
    display: none;
  }

  @media (max-width: 1140px) {
    top: 90px;
  }
`;

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  author,
  img,
  postId
}) => {
  return (
    <>
      <BoxContainer margin={'2rem 0 0'}>
        {img && <StyledImg fluid={img} />}
        <BoxElement wrap lightBG>
          <Headline>{title}</Headline>
          <Text>{content}</Text>
        </BoxElement>
        {tags && (
          <BoxElement wrap lightBG>
            <Headline>Verwandte Beiträge:</Headline>
            <RelatedPosts tags={tags} postTitle={title} postContent={content} />
          </BoxElement>
        )}
        {categories && categories.length && (
          <BoxElement wrap>
            <Meta>Gepostet in:</Meta>
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
            <Meta>Getagged mit:</Meta>
            {tags.map(tag => (
              <Meta key={`${tag.slug}tag`}>
                <Link to={`/tags/${tag.slug}/`}>{tag.name}</Link>
              </Meta>
            ))}
          </BoxElement>
        )}

        <Pingbacks postId={postId} />
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
  title: PropTypes.string,
  postId: PropTypes.number
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

  const backClick = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const { wordpressPost: post } = data;
  const img = post.featured_media
    ? post.featured_media.localFile.childImageSharp.fluid
    : null;

  return (
    <>
      <Helmet title={`${post.title} | EAID`} />
      <BackButton tabIndex="-1" role="Navigation">
        <StyledLink
          onClick={backClick}
          dangerouslySetInnerHTML={{
            __html: 'zurück'
          }}
        />
      </BackButton>
      <BlogPostTemplate
        content={post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        author={post.author}
        img={img}
        postId={post.wordpress_id}
      />
      {post.comment_status === 'open' && (
        <>
          <PostComments
            postId={post.wordpress_id}
            onAnswerClick={executeScroll}
          />
          <CommentsForm
            postId={post.wordpress_id}
            ref={ref}
            answerToParentId={answerToParentId}
            answerToParentName={authorName}
            cancelAnswer={() => setAnswerToParentId(0)}
          />
        </>
      )}
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
    date(formatString: "DD.MM.YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      ...PostFields
      wordpress_id
      comment_status
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
