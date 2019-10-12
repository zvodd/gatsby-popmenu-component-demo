/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const slash = require(`slash`)



exports.createPages = (props) => {
    // run multiple create_X_Pages in parrellel
    return Promise.all([
        createProductPages(props),
        ]);
}

const createProductPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const productTemplate = path.resolve(`src/templates/product.js`)

  return graphql(
    `{
        allMarkdownRemark(filter: {fileAbsolutePath: {glob: "**/src/products/**"}}) {
            nodes {
              id
              fileAbsolutePath
              frontmatter {
                title
                sku
                path
              }
           }
        }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
  }
    result.data.allMarkdownRemark.nodes.forEach(node => {
        createPage({
                path: node.frontmatter.path, // required
                component: slash(productTemplate),
                context: {
                  title:  node.frontmatter.title,
                  id: node.id
                },
          })
    })

    // result.data.allMarkdownRemark.nodes.forEach(node => {
    //     let fp = node.fileAbsolutePath;
    //     let id = node.id;

    //     d = fp.slice(0, fp.lastIndexOf('/'))
    //     up1 = d.slice(d.lastIndexOf('/'))
    //     return {dir:d, id}
    // })

    // // Create blog posts pages.
    // result.data.allMarkdownRemark.edges.forEach(edge => {
    //   createPage({
    //     path: edge.node.fields.slug, // required
    //     component: slash(blogPostTemplate),
    //     context: {
    //       slug: edge.node.fields.slug,
    //       highlight: edge.node.frontmatter.highlight,
    //       shadow: edge.node.frontmatter.shadow,
    //     },
    //   })
    // })
  })
}



// query MyQuery {
//   allDirectory(filter: {absolutePath: {glob: "**/src/products/**"}}) {
//     nodes {
//       name
//       dir
//       ino
//       base
//       relativePath
//       relativeDirectory
//       absolutePath
//     }
//   }
//   md: allMarkdownRemark(filter: {fileAbsolutePath: {glob: "**/src/products/**"}, frontmatter: {sku: {}}}) {
//     nodes {
//       id
//       fileAbsolutePath
//       frontmatter {
//         title
//         sku
//         path
//       }
//     }
//   }
// }
