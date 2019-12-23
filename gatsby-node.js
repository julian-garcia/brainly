const path = require(`path`);
const slash = require(`slash`);
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(
    `
      {
        allContentfulSuperLink {
          edges {
            node {
              id
              slug
              number
              word
              image {
                file {
                  url
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data",      result.errors);
      }
      // Resolve the paths to our template
      const numberSystemPage = path.resolve("./src/pages/number-system/entry.js");
      // Then for each result we create a page.
      result.data.allContentfulSuperLink.edges.forEach(edge => {
        createPage({
          path: `/number-system/entry/${edge.node.slug}/`,
          component: slash(numberSystemPage),
          context: {
	          slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};