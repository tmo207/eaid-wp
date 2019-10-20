import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { FormattedMessage } from 'react-intl';

import BoxContainer from '../components/ContentBox/BoxContainer';
import BoxElement from '../components/ContentBox/BoxElement';
import Headline from '../components/Headline';
import Text from '../components/Text';
import ButtonContainer from '../components/Button/ButtonContainer';
import DateAndAuthor from '../components/DateAndAuthor';
import Button from '../components/Button/Button';
import VeranstaltungsPreview from '../components/Veranstaltungen/VeranstaltungsPreview';

import { getExcerpt, getMenuSubFields } from '../_common/func';
import {
  ROUNDED_CORNERS,
  VERANSTALTUNGEN_ID,
  AKTUELLES_ID,
  MOBILE_TEXT,
  HANDHELD_MQ
} from '../_common/config';

const StyledImg = styled(Img)`
  border-radius: ${ROUNDED_CORNERS};
`;

const Email = styled.a`
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  @${HANDHELD_MQ} {
    font-size: ${MOBILE_TEXT};
  }
`;

const Startseite = () => {
  const [windowWidth, setwindowWidth] = useState();
  const isDesktop = windowWidth >= 1200;

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  const onResize = () => {
    setwindowWidth(window.innerWidth);
  };

  const data = useStaticQuery(StartseitenQuery);
  const {
    author,
    date,
    excerpt,
    slug,
    title,
    featured_media
  } = data.wordpressPost;
  const nextVeranstaltungId = getMenuSubFields(
    data.allWordpressWpApiMenusMenusItems.edges,
    VERANSTALTUNGEN_ID
  )[0].object_id;

  const aktuellstes = getMenuSubFields(
    data.allWordpressWpApiMenusMenusItems.edges,
    AKTUELLES_ID
  )[0];

  return (
    <>
      {data.allWordpressPage &&
        data.allWordpressPage.edges &&
        data.allWordpressPage.edges[0] &&
        data.allWordpressPage.edges[0].node && (
          <>
            {data.allWordpressPage.edges[0].node.title && (
              <Headline
                margin={isDesktop ? '0 0 6rem' : '0 0 4rem'}
                type="Large"
              >
                {data.allWordpressPage.edges[0].node.title}
              </Headline>
            )}
            {data.allWordpressPage.edges[0].node.content && (
              <Text
                margin={isDesktop ? '0 0 6rem 15%' : '0 0 4rem'}
                contentWidth
              >
                {data.allWordpressPage.edges[0].node.content}
              </Text>
            )}
          </>
        )}

      <BoxContainer margin={isDesktop ? '6rem 15% 6rem 0' : '4rem 0'}>
        <BoxElement>
          <FormattedMessage id="NEWEST_POST_HEADLINE">
            {headline => (
              <Headline margin="0" type="Medium">
                {headline}
              </Headline>
            )}
          </FormattedMessage>
        </BoxElement>
        {featured_media && featured_media.localFile && (
          <StyledImg fluid={featured_media.localFile.childImageSharp.fluid} />
        )}
        <BoxElement>
          <Link to={`/${slug}`} className="noLine">
            <Headline margin="0">{title}</Headline>
          </Link>
        </BoxElement>
        <BoxElement>
          <Text margin="0">{getExcerpt(excerpt, true)}</Text>
        </BoxElement>
        <BoxElement noPadding>
          <ButtonContainer>
            <DateAndAuthor>
              <Link to={`/author/${author.slug}`}>
                {date} @{author.name}
              </Link>
            </DateAndAuthor>
            <FormattedMessage id="SHOW_FULL_POST">
              {message => (
                <Button type="Grey" to={`/${slug}`}>
                  {message}
                </Button>
              )}
            </FormattedMessage>
          </ButtonContainer>
        </BoxElement>
        <BoxElement noPadding>
          <FormattedMessage id="SHOW_ALL_POSTS">
            {message => (
              <Button type="Yellow" to="/category/eaid-blog/">
                {message}
              </Button>
            )}
          </FormattedMessage>
        </BoxElement>
      </BoxContainer>

      <BoxContainer margin={isDesktop ? '6rem 0 6rem 15%' : '4rem 0'}>
        <BoxElement>
          <FormattedMessage id="EVENTS_HEADLINE">
            {headline => (
              <Headline margin="0" type="Medium">
                {headline}
              </Headline>
            )}
          </FormattedMessage>
        </BoxElement>
        <VeranstaltungsPreview id={nextVeranstaltungId} />
      </BoxContainer>

      <BoxContainer margin={isDesktop ? '6rem 15% 6rem 0' : '4rem 0'}>
        <BoxElement>
          <FormattedMessage id="NEWS_HEADLINE">
            {headline => (
              <Headline margin="0" type="Medium">
                {headline}
              </Headline>
            )}
          </FormattedMessage>
        </BoxElement>
        <BoxElement>
          <Link to={`${aktuellstes.object_slug}`} className="noLine">
            <Headline margin="0">{aktuellstes.title}</Headline>
          </Link>
        </BoxElement>
        <BoxElement noPadding>
          <FormattedMessage id="SHOW_ARTICLE">
            {message => (
              <Button type="White" to={`/${aktuellstes.object_slug}`}>
                {message}
              </Button>
            )}
          </FormattedMessage>
        </BoxElement>
      </BoxContainer>

      {data.allWordpressPage &&
        data.allWordpressPage.edges &&
        data.allWordpressPage.edges[0] &&
        data.allWordpressPage.edges[0].node &&
        data.allWordpressPage.edges[0].node.acf &&
        (data.allWordpressPage.edges[0].node.acf.kontakttext ||
          data.allWordpressPage.edges[0].node.acf.email) && (
          <BoxContainer margin={isDesktop ? '6rem 7.5% 6rem 7.5%' : '4rem 0'}>
            <BoxElement>
              <FormattedMessage id="CONTACT_HEADLINE">
                {headline => <Headline margin="0">{headline}</Headline>}
              </FormattedMessage>
            </BoxElement>
            <BoxElement>
              <Text margin="0">
                {data.allWordpressPage.edges[0].node.acf.kontakttext}
              </Text>
            </BoxElement>
            {data.allWordpressPage.edges[0].node.acf.email && (
              <BoxElement inline>
                <Text inline margin="0">
                  {'E-Mail: '}
                </Text>
                <Email
                  href={`mailto:${data.allWordpressPage.edges[0].node.acf.email}`}
                  className="noLine"
                  dangerouslySetInnerHTML={{
                    __html: data.allWordpressPage.edges[0].node.acf.email
                  }}
                />
              </BoxElement>
            )}
          </BoxContainer>
        )}
    </>
  );
};

const StartseitenQuery = graphql`
  query StartseitenQuery {
    wordpressPost {
      ...PostListFields
    }
    allWordpressPage(filter: { path: { eq: "/" } }) {
      edges {
        node {
          title
          content
          acf {
            kontakttext
            email
          }
        }
      }
    }
    allWordpressWpApiMenusMenusItems {
      edges {
        node {
          wordpress_id
          items {
            object_id
            wordpress_children {
              title
              object_id
              object_slug
            }
          }
        }
      }
    }
  }
`;

export default Startseite;
