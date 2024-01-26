import React from 'react'
import "./PopUp.css"

function PopUp({ bgcolor, msg }) {
  return (
    <div className='popUpMain' style={{ backgroundColor: `${bgcolor}` }}>
      {msg}
    </div>
  )
}

export default PopUp
