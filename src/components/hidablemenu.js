import React from "react"
function HidableMenu({isActive, toggleAction}) {
  const getClass = () => (
    "side-menu" + (isActive?" active":"")
  );
  return (
      <div className={getClass()} > 
        <button onClick={()=>{toggleAction(false)}}> Close the Menu </button>
        <div>
            Menu Item
        </div>
      </div>
  );
}

export default HidableMenu