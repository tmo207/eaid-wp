import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';

import BoxElement from '../ContentBox/BoxElement';
import Headline from '../Headline';

const AktuellesPreview = ({ id }) => (
  <StaticQuery
    query={aktuellesPreviewQuery}
    render={data => {
      const page = data.allWordpressPage.edges.filter(
        page => page.node.wordpress_id === id
      );

      return (
        <>
          {page[0] && page[0].node && (
            <BoxElement>
              <Link to={`/${page[0].node.slug}`} className="noLine">
                <Headline margin="0">{page[0].node.title}</Headline>
              </Link>
            </BoxElement>
          )}
        </>
      );
    }}
  />
);

AktuellesPreview.propTypes = {
  id: PropTypes.number.isRequired
};

export default AktuellesPreview;

const aktuellesPreviewQuery = graphql`
query aktuellesPreviewQuery {
  allWordpressPage {
    edges {
      node {
        title
        wordpress_id
        content
        slug
      }
    }
  }
}
`;
