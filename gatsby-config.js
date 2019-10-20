module.exports = {
  siteMetadata: {
    title: 'Europäische Akademie für Informationsfreiheit und Datenschutz e.V.',
    description:
      'Dies ist der Blog der Europäischen Akademie für Informationsfreiheit und Datenschutz.',
    siteUrl: 'https://www.eaid-berlin.de'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map(edge => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.title,
                    description: edge.node.excerpt,
                    date: edge.node.date,
                    url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + '/' + edge.node.slug
                  }
                );
              });
            },
            query: `
              {
                allWordpressPost(
                  sort: { fields: date, order: DESC }
                ) {
                  edges {
                    node {
                      id
    title
    excerpt
    author {
      name
      slug
    }
    date(formatString: "DD.MM.YYYY")
    slug
                    }
                  }
                }
              }
            `,
            output: '/feed.xml',
            title:
              'Europäische Akademie für Informationsfreiheit und Datenschutz'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/img`
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'eaid-berlin.de/zzUbVKD3ckNW',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: true,
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: true,
        includedRoutes: [
          '**/categories',
          '**/comments',
          '**/posts',
          '**/pages',
          '**/media',
          '**/tags',
          '**/taxonomies',
          '**/users',
          '**/menus',
          '**/types',
          '**/statuses',
          '**/search',
          '**/pingbacks'
        ]
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/img/EAID.png'
      }
    }
  ]
};
