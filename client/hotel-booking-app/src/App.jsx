import { useState } from 'react'
import './App.css'
import AddRoom from './components/rooms/AddRoom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddRoom />
    </>
  )
}

export default App
