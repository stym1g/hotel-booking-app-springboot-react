import React from 'react'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import MainHeader from '../layout/MainHeader'

function Home() {
  return (
    <section>
        <MainHeader />
        <section className='container'>
          <RoomCarousel />
          <Parallax />
          <HotelService />
          <Parallax />
        </section>
    </section>
  )
}

export default Home