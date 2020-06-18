const path = require('path');

// Setup absolute paths for imports
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};


exports.createPages = ({ graphql, actions }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  body
                  parent {
                    ... on File {
                      name
                      sourceInstanceName
                    }
                  }
                  frontmatter {
                    title
                    path
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        // this is some boilerlate to handle errors
        if (result.errors) reject(result.errors)
        
        /** 
         * Create a page for each mdx file
        */
        result.data.allMdx.edges.forEach(({ node }) => {
          if(node.frontmatter.path === null) return;
          
          createPage({
            // Path for component docs
            path: node.frontmatter.path,
            // This component will wrap our MDX content
            component: path.resolve(`./src/templates/basicLayout.js`),
            // We can use the values in this 
            // context in our page layout component
            context: { 
              pathSlug: node.frontmatter.path,
              id: node.id, },
          });
        })
      }),
    );
  });
};