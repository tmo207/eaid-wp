import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import BoxContainer from '../components/ContentBox/BoxContainer';
import BoxElement from '../components/ContentBox/BoxElement';
import Headline from '../components/Headline';
import Text from '../components/Text';
import ButtonContainer from '../components/Button/ButtonContainer';
import DateAndAuthor from '../components/DateAndAuthor';
import Button from '../components/Button/Button';
import VeranstaltungsPreview from '../components/Veranstaltungen/VeranstaltungsPreview';

import { getExcerpt, getVeranstaltungen } from '../_common/func';
import { ROUNDED_CORNERS } from '../_common/config';

const StyledImg = styled(Img)`
  border-radius: ${ROUNDED_CORNERS};
`;

const Email = styled.a`
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Startseite = () => {
  return (
    <StaticQuery
      query={StartseitenQuery}
      render={data => {
        const {
          author,
          date,
          excerpt,
          slug,
          title,
          featured_media
        } = data.wordpressPost;
        const {
          title: siteTitle,
          content
        } = data.allWordpressPage.edges[0].node;
        const { kontakttext, email } = data.allWordpressPage.edges[0].node.acf;
        const nextVeranstaltungId = getVeranstaltungen(
          data.allWordpressWpApiMenusMenusItems.edges
        )[0].object_id;

        return (
          <>
            <Headline type="Large">{siteTitle}</Headline>
            <Text>{content}</Text>
            <BoxContainer>
              <BoxElement>
                <Headline margin="0" type="Medium">
                  Neuester Blogeintrag
                </Headline>
              </BoxElement>
              {featured_media && featured_media.localFile && (
                <StyledImg
                  fluid={featured_media.localFile.childImageSharp.fluid}
                />
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
                  <Button type="Grey" to={`/${slug}`}>
                    weiterlesen
                  </Button>
                </ButtonContainer>
              </BoxElement>
              <BoxElement noPadding>
                <Button type="Yellow" to="/category/eaid-blog/">
                  Zeige alle Beiträge
                </Button>
              </BoxElement>
            </BoxContainer>

            <BoxContainer>
              <BoxElement>
                <Headline margin="0" type="Medium">
                  Nächste Veranstaltung
                </Headline>
              </BoxElement>
              <VeranstaltungsPreview id={nextVeranstaltungId} />
            </BoxContainer>

            <BoxContainer>
              <BoxElement>
                <Headline margin="0">Kontakt</Headline>
              </BoxElement>
              <BoxElement>
                <Text margin="0">{kontakttext}</Text>
              </BoxElement>
              {email && (
                <BoxElement inline>
                  <Text inline margin="0">
                    {'E-Mail: '}
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
          </>
        );
      }}
    />
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
