import React, {useContext, useEffect, useState} from 'react'
import './App.css'
import "./firebase/index.js"

import {Outlet} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {AppContext} from "./context/AppContext.jsx";
import useToast from "./hooks/useToast.jsx";
import {PhotoProvider, PhotoView} from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import Footer from "./components/Footer/Footer.jsx";


function App() {
	const {
		state,
		actions: {setAuth},
	} = useContext(AppContext);
	
	const [toast, ToastContainer] =  useToast()
	
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
	
	const images = [
		"/banner-wide-image2.jpg",
		"https://react-photo-view.vercel.app/_next/static/media/1.c788857d.jpg"
	]
	let a = [
		<img src="https://react-photo-view.vercel.app/_next/static/media/1.c788857d.jpg" />
	]
  return (
    <div className="App">
	    
	    
	{/*    <PhotoProvider>*/}
    {/*    <PhotoView >*/}
	{/*		<img src={images[0]} />*/}
    {/*  </PhotoView>*/}
	{/*	    <h1>dsfff</h1>*/}
    {/*</PhotoProvider>*/}
	   
	    <ToastContainer />
        <Navigation />
	    <Outlet />
	    <Footer />
    </div>
  )
}

export default App
