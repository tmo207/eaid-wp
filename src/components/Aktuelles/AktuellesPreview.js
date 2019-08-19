import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, Link } from 'gatsby';

import BoxElement from '../ContentBox/BoxElement';
import Headline from '../Headline';

import { ChildPagesQuery } from '../Veranstaltungen/VeranstaltungsPreview';

const AktuellesPreview = ({ id }) => {
  return (
    <StaticQuery
      query={ChildPagesQuery}
      render={data => {
        const page = data.allWordpressPage.edges.filter(
          page => page.node.wordpress_id === id
        );

        return (
          <>
            {page[0] && page[0].node && (
              <BoxElement>
                <Link to={`/${page[0].node.slug}`} className="noLine">
                  <Headline margin={'0'}>{page[0].node.title}</Headline>
                </Link>
              </BoxElement>
            )}
          </>
        );
      }}
    />
  );
};

AktuellesPreview.propTypes = {
  id: PropTypes.number.isRequired
};

export default AktuellesPreview;
