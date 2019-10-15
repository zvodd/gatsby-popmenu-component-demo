import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const ProductPage = (props) => (
  <Layout>
    <SEO title="Product" />
    {(props.data.markdownRemark.html)?(
        <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}} />
      ):(
        <h1>Error No Content For this ProductPage!</h1>
    )}
    {props.pageContext.images.map((img)=>(
        <img src={img.src}  alt={img.name}/>
    ))}
    <h5>Debug Props:</h5>
    <DebugObject obj={props.pageContext} />
  </Layout>
)

const DebugObject = ({obj}) =>{
  console.log(obj)
  return (
  <ul>
    {Object.keys(obj).map((name) => {
        return <li key={name}>
            {name}
        </li>
    })}
  </ul>
)}

export default ProductPage

export const productQuery = graphql`
query($id :String!){
  markdownRemark(id: {eq: $id}) {
    html
    frontmatter {
      sku
      title
    }
  }
}
`