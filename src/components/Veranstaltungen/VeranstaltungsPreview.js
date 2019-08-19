import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import BoxElement from '../ContentBox/BoxElement';
import Headline from '../Headline';
import Text from '../Text';
import Button from '../Button/Button';

import { getExcerpt } from '../../_common/func';

const VeranstaltungsPreview = ({ id }) => {
  return (
    <StaticQuery
      query={ChildPagesQuery}
      render={data => {
        const page = data.allWordpressPage.edges.filter(
          page => page.node.wordpress_id === id
        )[0].node;

        return (
          <>
            <BoxElement>
              <Link to={`/${page.slug}`} className="noLine">
                <Headline margin={'0'}>{page.title}</Headline>
              </Link>
            </BoxElement>
            <BoxElement>
              <Text margin={'0'}>{getExcerpt(page.content, false)}</Text>
            </BoxElement>
            <BoxElement noPadding>
              <Button type="White" to={`/${page.slug}`}>
                Zur Veranstaltung
              </Button>
            </BoxElement>
          </>
        );
      }}
    />
  );
};

VeranstaltungsPreview.propTypes = {
  id: PropTypes.number.isRequired
};

export const ChildPagesQuery = graphql`
  query ChildPagesQuery {
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

export default VeranstaltungsPreview;
