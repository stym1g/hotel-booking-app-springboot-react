import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
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
