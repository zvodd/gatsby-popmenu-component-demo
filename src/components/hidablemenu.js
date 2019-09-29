import React from "react"
function HidableMenu({isActive, toggleAction}) {
  const getClass = () => (
    "side-menu" + (isActive?" active":"")
  );
  return (
      <div className={getClass()} > 
      <div className="menu-button close-button" onClick={()=>{toggleAction(false)}}/>
        <div>
            <li>Menu Item</li>
            <li>Menu Item</li>
            <li>Menu Item</li>
        </div>
      </div>
  );
}

export default HidableMenu
