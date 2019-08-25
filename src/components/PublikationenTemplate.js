import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Headline from './Headline';
import Text from './Text';
import BoxContainer from './ContentBox/BoxContainer';
import BoxElement from './ContentBox/BoxElement';

export const PublikationenTemplate = () => {
  return (
    <StaticQuery
      query={publikationenQuery}
      render={data => {
        const { title, content, acf } = data.wordpressPage;
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

PublikationenTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  boxenContent: PropTypes.arrayOf(PropTypes.object)
};

export default PublikationenTemplate;

const publikationenQuery = graphql`
  query publikationenQuery {
    wordpressPage(wordpress_id: { eq: 947 }) {
      title
      content
      wordpress_id
      acf {
        contentboxen_page {
          __typename
          ... on wordpress__AcfContentbox {
            uberschrift
            content
            id
          }
        }
      }
    }
  }
`;
