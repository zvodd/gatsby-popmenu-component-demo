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
    const fp = node.fileAbsolutePath;
    const dir = fp.slice(0, fp.lastIndexOf('/'))
    const galleryQuery = graphql(`
        {
          allFile(filter: {absolutePath: {glob: "`+ dir + "/**" + `"}, extension: {in: ["jpg","png"]}}) {
            edges {
              node {
                id
                publicURL
                name
              }
            }
          }
        }
    `).then(result => {
        if (result.errors) {
          throw result.errors
        }
        const images = result.data.allFile.edges.map((res) => {
            return {src: res.node.publicURL,  name: res.node.name}
        })
        console.log("images", images)
        createPage({
            path: node.frontmatter.path, // required
            component: slash(productTemplate),
            context: {
              title:  node.frontmatter.title,
              id: node.id,
              images
            }
        })
    })
  })
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
