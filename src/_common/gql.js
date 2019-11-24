/* eslint-disable import/prefer-default-export */
import { graphql } from 'gatsby';

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    polylang_current_lang
    id
    title
    excerpt
    author {
      name
      slug
    }
    date(formatString: "DD.MM.YYYY")
    slug
    featured_media {
      localFile {
        childImageSharp {
          fluid(maxWidth: 960, maxHeight: 600) {
            base64
            tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
            presentationWidth
            presentationHeight
          }
        }
      }
    }
  }
`;
