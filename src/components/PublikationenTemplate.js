import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Headline from './Headline';
import Text from './Text';
import BoxContainer from './ContentBox/BoxContainer';
import BoxElement from './ContentBox/BoxElement';

import { useLanguageStateValue } from '../_common/state';
import { getRightLanguagePage } from '../_common/func';

export const PublikationenTemplate = () => {
  const [{ language }] = useLanguageStateValue();

  return (
    <StaticQuery
      query={publikationenQuery}
      render={data => {
        const rightLanguageContent = getRightLanguagePage(
          data.wordpressPage.polylang_translations,
          language
        );

        const { title, content, acf } = rightLanguageContent;
        const { contentboxen_page: contentBoxen } = acf;

        return (
          <>
            <Headline>{title}</Headline>
            <Text>{content}</Text>
            {contentBoxen.map(box => (
              <BoxContainer key={box.id}>
                <BoxElement>
                  <Headline margin="0">{box.uberschrift}</Headline>
                </BoxElement>
                <BoxElement>
                  <Text margin="0">{box.content}</Text>
                </BoxElement>
              </BoxContainer>
            ))}
          </>
        );
      }}
    />
  );
};

export default PublikationenTemplate;

const publikationenQuery = graphql`
  query publikationenQuery {
    wordpressPage(wordpress_id: { eq: 947 }) {
      polylang_translations {
        polylang_current_lang
        title
        content
        wordpress_id
        acf {
          contentboxen_page {
            __typename
            ... on WordPressAcf_contentbox {
              uberschrift
              content
              id
            }
          }
        }
      }
    }
  }
`;
