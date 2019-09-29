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
          <header>
            <div className="headbar">
              <h1>
                <Link to="/">{this.props.siteTitle}</Link>
              </h1>
            </div>
            <div className="menu-togglewrap">
              <div className="menu-button main-button" onClick={()=>{this.toggleMenu()}}/>
            </div>
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
