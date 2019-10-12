import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

function HidableMenu({isActive, toggleAction,}) {
  //hmm
  // const siteMenu = useStaticQuery(graphql`
  //   {
  //     allSitePage(filter: {pluginCreator: {name: {eq: "gatsby-plugin-page-creator"}}}) {
  //       edges {
  //         node {
  //           id
  //           path
  //           internalComponentName
  //         }
  //       }
  //     }
  //   }
  //  `)

  const getClass = () => (
    "side-menu" + (isActive?" active":"")
  );
  return (
      <div className={getClass()} > 
              <div className="menu-button close-button" onClick={()=>{toggleAction(false)}}/>
        <ul>
        <li><Link to="/">Index</Link></li>
        <li><Link to="/page-2">Page 2</Link></li>

        <li><Link>Menu Item</Link></li>
        </ul>
      </div>
  );
}

export default HidableMenu
