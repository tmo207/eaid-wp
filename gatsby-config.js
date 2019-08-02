module.exports = {
  siteMetadata: {
    title: 'Europäische Akademie für Informationsfreiheit und Datenschutz',
    description:
      'Dies ist der Blog der Europäischen Akademie für Informationsfreiheit und Datenschutz.'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
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
        baseUrl: 'eaid-berlin.de',
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
          '**/search'
        ]
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp'
  ]
};
