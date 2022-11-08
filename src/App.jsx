import React, {useContext, useEffect, useState} from 'react'
import './App.css'
import "./firebase/index.js"

import {Outlet} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import {AppContext} from "./context/AppContext.jsx";

function App() {
	const {
		state,
		actions: {setAuth},
	} = useContext(AppContext);
	
	const auth = getAuth();
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuth({
					uId: user.uid,
					displayName: user.displayName,
					email: user.email,
					userId: user.uid,
					photoURL: user.photoURL,
				}, true);
			} else {
				// User is signed out
				setAuth(null, true);
			}
		});
		
		return ()=>unsubscribe ()
	}, [])
	
  return (
    <div className="App">
        <Navigation />
	    <Outlet />
    </div>
  )
}

export default App
