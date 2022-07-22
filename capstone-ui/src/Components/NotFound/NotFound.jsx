import React from 'react'
import './NotFound.css'
import Overlay from '../Overlay/Overlay'


function NotFound() {

  //return statement for the not found component
  return (
    <div className='notfound'>

      {/* div that holds the notfound image at the background */}
        <div className="notfound-img">
          <img src="https://cdn-icons-png.flaticon.com/512/6537/6537649.png" alt="page not found"  />
        </div>

      {/* div with the notfound text */}
        <div className='notfound-404'>
            <h1> 404 </h1>
            <h3> Page does not exist </h3>
        </div>
        <Overlay />
    </div>
  )
}

export default NotFound