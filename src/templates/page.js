import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import BoxContainer from '../components/ContentBox/BoxContainer';
import BoxElement from '../components/ContentBox/BoxElement';
import Headline from '../components/Headline';
import Text from '../components/Text';

import { selectTemplate } from '../_common/func';

export const PageTemplate = ({ title, content }) => {
  return (
    <BoxContainer>
      <BoxElement lightBG>
        <Headline margin="0">{title}</Headline>
      </BoxElement>
      <BoxElement lightBG>
        <Text margin="0">{content}</Text>
      </BoxElement>
    </BoxContainer>
  );
};

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string
};

const Page = ({ data }) => {
  const { wordpressPage: page } = data;
  const { wordpress_id: pageId } = page;

  const Template = selectTemplate(pageId);

  return (
    <>
      <Helmet>
        <title>{`EAID » ${page.title}`}</title>
      </Helmet>
      <Template title={page.title} content={page.content} id={pageId} />
    </>
  );
};

Page.propTypes = {
  data: PropTypes.object.isRequired
};

export default Page;

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      wordpress_id
    }
  }
`;
