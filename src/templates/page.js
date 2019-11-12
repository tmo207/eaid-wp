import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import BoxContainer from '../components/ContentBox/BoxContainer';
import BoxElement from '../components/ContentBox/BoxElement';
import Headline from '../components/Headline';
import Text from '../components/Text';

import { selectTemplate, getRightLanguagePage } from '../_common/func';
import { useLanguageStateValue } from '../_common/state';

export const PageTemplate = ({ title, content }) => (
  <BoxContainer>
    <BoxElement lightBG>
      <Headline margin="0">{title}</Headline>
    </BoxElement>
    <BoxElement lightBG>
      <Text margin="0">{content}</Text>
    </BoxElement>
  </BoxContainer>
);

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string
};

const Page = ({ data }) => {
  const [{ language }] = useLanguageStateValue();

  const { wordpressPage: page } = data;
  const { wordpress_id: pageId } = page;

  const Template = selectTemplate(pageId);

  const rightLanguagePage = getRightLanguagePage(
    data.wordpressPage.polylang_translations,
    language
  );

  return (
    <>
      <Helmet>
        <title>{`EAID » ${page.title}`}</title>
      </Helmet>
      <Template
        title={rightLanguagePage.title}
        content={rightLanguagePage.content}
        id={pageId}
      />
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
      polylang_current_lang
      wordpress_id
      polylang_translations {
        polylang_current_lang
        title
        content
        wordpress_id
      }
    }
  }
`;
