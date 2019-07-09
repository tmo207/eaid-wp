import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
import BoxContainer from '../ContentBox/BoxContainer';
import BoxElement from '../ContentBox/BoxElement';
import Headline from '../Headline';
import Text from '../Text';
import { getExcerpt } from '../../_common/func';
import Button from '../Button/Button';

const VeranstaltungenPreview = ({ id }) => {
  return (
    <StaticQuery
      query={graphql`
        query VeranstaltungenChildrenPages {
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
      `}
      render={data => {
        const page = data.allWordpressPage.edges.filter(
          page => page.node.wordpress_id === id
        )[0].node;

        return (
          <BoxContainer>
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
          </BoxContainer>
        );
      }}
    />
  );
};

VeranstaltungenPreview.propTypes = {
  id: PropTypes.number.isRequired
};

export default VeranstaltungenPreview;
