import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Headline from '../Headline';
import Text from '../Text';
import BoxContainer from '../ContentBox/BoxContainer';
import BoxElement from '../ContentBox/BoxElement';
import DateAndAuthor from '../DateAndAuthor';
import Button from '../Button/Button';
import ButtonContainer from '../Button/ButtonContainer';

const PostPreview = ({ post }) => {
  return (
    <BoxContainer>
      <BoxElement>
        <Link to={`/${post.slug}`}>
          <Headline margin={'0'}>{post.title}</Headline>
        </Link>
      </BoxElement>
      <BoxElement>
        <Text>{`${post.excerpt.replace(/<(.|\n)*?>/g, '')}...`}</Text>
      </BoxElement>
      <BoxElement noPadding>
        <ButtonContainer>
          <DateAndAuthor>
            <Link to={`/author/${post.author.slug}`}>
              {post.date} @{post.author.name}
            </Link>
          </DateAndAuthor>
          <Button type="Grey" to={`/${post.slug}`}>
            weiterlesen
          </Button>
        </ButtonContainer>
      </BoxElement>
    </BoxContainer>
  );
};

PostPreview.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    excerpt: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string
    })
  }).isRequired
};

export default PostPreview;
