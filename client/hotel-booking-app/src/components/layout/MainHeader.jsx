import React from 'react'

function MainHeader() {
  return (
    <header className='header-banner'>
        <div className='overlay'></div>
        <div className='animated-texts overlay-content'>
            <h1>Welcome to <span className='hotel-color'>Lakeside Hotel</span></h1>
            <h4>Experience the best hospitality in the city</h4>
        </div>
    </header>
  )
}

export default MainHeader