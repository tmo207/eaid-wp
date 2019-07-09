const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { paginate } = require('gatsby-awesome-pagination');

const getOnlyPublished = edges =>
  _.filter(edges, ({ node }) => node.status === 'publish');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
            status
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const pageTemplate = path.resolve('./src/templates/page.js');

      // Only publish pages with a `status === 'publish'` in production. This
      // excludes drafts, future posts, etc. They will appear in development,
      // but not in a production build.

      const allPages = result.data.allWordpressPage.edges;
      const pages =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allPages)
          : allPages;

      // Call `createPage()` once per WordPress page
      _.each(pages, ({ node: page }) => {
        createPage({
          path: `/${page.slug}/`,
          component: pageTemplate,
          context: {
            id: page.id
          }
        });
      });
    })
    .then(() =>
      graphql(`
        {
          allWordpressPost {
            edges {
              node {
                id
                slug
                status
              }
            }
          }
        }
      `)
    )
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const postTemplate = path.resolve('./src/templates/post.js');
      const blogTemplate = path.resolve('./src/templates/blog.js');

      // In production builds, filter for only published posts.
      const allPosts = result.data.allWordpressPost.edges;
      const posts =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allPosts)
          : allPosts;

      // Iterate over the array of posts
      _.each(posts, ({ node: post }) => {
        // Create the Gatsby page for this WordPress post
        createPage({
          path: `/${post.slug}/`,
          component: postTemplate,
          context: {
            postId: post.wordpress_id,
            id: post.id
          }
        });
      });

      // Create a paginated blog, e.g., /, /page/2, /page/3
      paginate({
        createPage,
        items: posts,
        itemsPerPage: 10,
        pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? '/' : '/blog'),
        component: blogTemplate
      });
    })
    .then(() =>
      graphql(`
        {
          allWordpressCategory(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      `)
    )
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const categoriesTemplate = path.resolve('./src/templates/category.js');

      // Create a Gatsby page for each WordPress Category
      _.each(result.data.allWordpressCategory.edges, ({ node: cat }) => {
        createPage({
          path: `/categories/${cat.slug}/`,
          component: categoriesTemplate,
          context: {
            name: cat.name,
            slug: cat.slug
          }
        });
      });
    })
    .then(() =>
      graphql(`
        {
          allWordpressTag(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      `)
    )

    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const tagsTemplate = path.resolve('./src/templates/tag.js');

      // Create a Gatsby page for each WordPress tag
      _.each(result.data.allWordpressTag.edges, ({ node: tag }) => {
        createPage({
          path: `/tags/${tag.slug}/`,
          component: tagsTemplate,
          context: {
            name: tag.name,
            slug: tag.slug
          }
        });
      });
    })
    .then(() =>
      graphql(`
        {
          allWordpressWpUsers {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `)
    )
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const authorTemplate = path.resolve('./src/templates/author.js');

      _.each(result.data.allWordpressWpUsers.edges, ({ node: author }) => {
        createPage({
          path: `/author/${author.slug}`,
          component: authorTemplate,
          context: {
            id: author.id
          }
        });
      });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value
    });
  }
};

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type wordpress__PAGE implements Node {
      acf: wordpress__AcfFields
    }
    type wordpress__AcfFields implements Node {
      person: wordpress__AcfPerson
      standort: wordpress__AcfStandort
    }
    type wordpress__AcfPerson implements Node {
      biografie: String
      email_adresse: String
      name: String
      tatigkeit: String
      website: String
      id: String
      bild: wordpress__AcfImage
    }
    type wordpress__AcfStandort implements Node {
      uberschrift: String
      foto: wordpress__AcfImg
      beschreibung: String
    }
    type wordpress__AcfImage implements Node {
      source_url: String
    }
    type wordpress__AcfImg implements Node {
      source_url: String
    }
  `;
  createTypes(typeDefs);
};
