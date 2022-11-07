import { useState } from 'react'
import './App.css'
import {Button} from "@material-tailwind/react";
import Navigation from "./components/Navigation/Navigation.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Navigation />
    </div>
  )
}

export default App
