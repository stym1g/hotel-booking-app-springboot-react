import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './components/rooms/AddRoom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/home/Home'
import Editroom from './components/rooms/Editroom'
import ExistingRooms from './components/rooms/ExistingRooms'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <Router>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit-room/:roomId' element={<Editroom />} />
          <Route path='/existing-rooms' element={<ExistingRooms />} />
          <Route path='/add-room' element={<AddRoom />} />
        </Routes>
      </Router>
      <Footer />
    </main>
    </>
  )
}

export default App
