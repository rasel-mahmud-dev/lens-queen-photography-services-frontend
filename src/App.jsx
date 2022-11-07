import React, { useState } from 'react'
import './App.css'

import {Outlet} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";


function App() {
  return (
    <div className="App">
        <Navigation />
	    <Outlet />
    </div>
  )
}

export default App
