import React from 'react'
import { Link } from 'react-router-dom'

function Admin() {
  return (
    <section className='container mt-5'>
        <h2>Welcome to Admin panel</h2>
        <hr />
        <Link to={"/add-room"}>Manage Rooms</Link>
    </section>
  )
}

export default Admin