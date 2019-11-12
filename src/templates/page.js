import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import BoxContainer from '../components/ContentBox/BoxContainer';
import BoxElement from '../components/ContentBox/BoxElement';
import Headline from '../components/Headline';
import Text from '../components/Text';

import {
  selectTemplate,
  getRightLanguagePage,
  getLanguage
} from '../_common/func';

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
  const language = getLanguage();

  const rightLanguagePage = getRightLanguagePage(
    data.wordpressPage.polylang_translations,
    language
  );

  const templateID = data.wordpressPage.polylang_translations.filter(
    translation => translation.polylang_current_lang === 'de_DE'
  )[0].wordpress_id;

  const Template = selectTemplate(templateID);

  return (
    <>
      <Helmet>
        <title>{`EAID » ${rightLanguagePage.title}`}</title>
      </Helmet>
      <Template
        title={rightLanguagePage.title}
        content={rightLanguagePage.content}
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
