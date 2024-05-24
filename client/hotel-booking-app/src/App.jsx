import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './components/rooms/AddRoom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/home/Home'
import Editroom from './components/rooms/Editroom'
import ExistingRooms from './components/rooms/ExistingRooms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit-room/:roomId' element={<Editroom />} />
          <Route path='/existing-rooms' element={<ExistingRooms />} />
        </Routes>
        <AddRoom />
        <ExistingRooms />
      </Router>
    </main>
    </>
  )
}

export default App
