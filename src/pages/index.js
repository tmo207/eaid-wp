/* eslint-disable react/jsx-one-expression-per-line */
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

import {
  getExcerpt,
  getMenuSubFields,
  getRightLanguagePage,
  getLanguage
} from '../_common/func';
import {
  ROUNDED_CORNERS,
  VERANSTALTUNGEN_ID,
  AKTUELLES_ID,
  MOBILE_TEXT,
  HANDHELD_MQ,
  VERANSTALTUNGEN_EN_ID,
  AKTUELLES_EN_ID,
  AKTUELLESARCHIV_EN_ID,
  AKTUELLESARCHIV_ID
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
  const language = getLanguage();
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

  const rightLanguagePost = getRightLanguagePage(data.wordpressPost.polylang_translations, language);

  const {
    author: postAuthor,
    date: postDate,
    excerpt: postExcerpt,
    slug: postSlug,
    title: postTitle,
    featured_media: postMedia
  } = rightLanguagePost;

  const veranstaltungenID = language === 'de' ? VERANSTALTUNGEN_ID : VERANSTALTUNGEN_EN_ID;
  const nextVeranstaltung = getMenuSubFields(
    data.allWordpressWpApiMenusMenusItems.edges,
    veranstaltungenID, language
  );
  const nextVeranstaltungId = nextVeranstaltung && nextVeranstaltung[0].object_id;

  const aktuellstesID = language === 'de' ? AKTUELLES_ID : AKTUELLES_EN_ID;
  const aktuellstes = getMenuSubFields(
    data.allWordpressWpApiMenusMenusItems.edges,
    aktuellstesID, language
  ).filter(news => news.object_id !== (AKTUELLESARCHIV_EN_ID || AKTUELLESARCHIV_ID))[0];

  const rightLanguagePageContent = getRightLanguagePage(
    data.allWordpressPage.edges[0].node.polylang_translations,
    language
  );

  const {
    title,
    content,
    acf: { kontakttext, email }
  } = rightLanguagePageContent;

  return (
    <>
      {rightLanguagePageContent && (
        <>
          {title && (
            <Headline margin={isDesktop ? '0 0 6rem' : '0 0 4rem'} type="Large">
              {title}
            </Headline>
          )}
          {content && (
            <Text margin={isDesktop ? '0 0 6rem 15%' : '0 0 4rem'} contentWidth>
              {content}
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
        {postMedia && postMedia.localFile && (
          <StyledImg fluid={postMedia.localFile.childImageSharp.fluid} />
        )}
        <BoxElement>
          <Link to={`/${postSlug}`} className="noLine">
            <Headline margin="0">{postTitle}</Headline>
          </Link>
        </BoxElement>
        <BoxElement>
          <Text margin="0">{getExcerpt(postExcerpt, true)}</Text>
        </BoxElement>
        <BoxElement noPadding>
          <ButtonContainer>
            <DateAndAuthor>
              <Link to={`/author/${postAuthor.slug}`}>
                {postDate} @{postAuthor.name}
              </Link>
            </DateAndAuthor>
            <FormattedMessage id="SHOW_FULL_POST">
              {message => (
                <Button type="Grey" to={`/${postSlug}`}>
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

      {!!nextVeranstaltungId && (
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
      )}

      {!!aktuellstes && (
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
      )}

      {rightLanguagePageContent &&
        rightLanguagePageContent.acf &&
        (kontakttext || email) && (
          <BoxContainer margin={isDesktop ? '6rem 7.5% 6rem 7.5%' : '4rem 0'}>
            <BoxElement>
              <FormattedMessage id="CONTACT_HEADLINE">
                {headline => <Headline margin="0">{headline}</Headline>}
              </FormattedMessage>
            </BoxElement>
            <BoxElement>
              <Text margin="0">{kontakttext}</Text>
            </BoxElement>
            {email && (
              <BoxElement inline>
                <Text inline margin="0">
                  E-Mail:
                </Text>
                <Email
                  href={`mailto:${email}`}
                  className="noLine"
                  dangerouslySetInnerHTML={{
                    __html: email
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
      polylang_current_lang
      polylang_translations {
      ...PostListFields
      }
    }
    allWordpressPage(filter: { path: { eq: "/" } }) {
      edges {
        node {
          polylang_current_lang
          title
          content
          acf {
            kontakttext
            email
          }
          polylang_translations {
            title
            polylang_current_lang
            content
            acf {
              kontakttext
              email
            }
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
