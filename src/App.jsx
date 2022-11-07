import { useState } from 'react'
import './App.css'
import {Button} from "@material-tailwind/react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
              <Button variant="filled" color="blue">filled</Button>
      <Button>Button</Button>
    </div>
  )
}

export default App
