import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import HidableMenu from "./hidablemenu"

class Header extends React.Component{
  constructor(props){
     super(props);
     this.state = {"menuShow":false}
     this.toggleMenu = this.toggleMenu.bind(this);
     this.render = this.render.bind(this);
  }

  toggleMenu(setOverride){
      console.log("toggleMenu, setOverride:", setOverride)
      let menuState = (typeof setOverride !== "undefined")?setOverride:!this.state.menuShow
      this.setState({"menuShow":menuState})
  }

  render(){
      return(
          <>
          <header
            style={{
              background: `rebeccapurple`,
              marginBottom: `1.45rem`,
            }}
          >
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
              }}
            >
              <h1 style={{ margin: 0 }}>
                <Link
                  to="/"
                  style={{
                    color: `white`,
                    textDecoration: `none`,
                  }}
                >
                  {this.props.siteTitle}
                </Link>
              </h1>
            </div>
            <button onClick={()=>{this.toggleMenu()}}>Menu </button>
          </header>
          <HidableMenu isActive={this.state.menuShow} toggleAction={this.toggleMenu}/>
          </>
      )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
