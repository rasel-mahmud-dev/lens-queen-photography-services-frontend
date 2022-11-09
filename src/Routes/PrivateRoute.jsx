import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context/AppContext.jsx";
import {Navigate, useLocation} from "react-router-dom";
import Loader from "../components/Loader/Loader.jsx";
import {checkTokenValidation} from "../context/actions.js";
import {logOutHandler} from "../firebase/authHandler.js";

const PrivateRoute = (props) => {
	const {state: {auth}, actions: { setAuth }} = useContext(AppContext)
	const location = useLocation()
	
	const [validToken, setValidtoken] = useState(false)
	const [checkToken, setCheckToken] = useState(false)
	
	useEffect(()=>{
		
		checkTokenValidation().then( async (isValid)=>{
			if(isValid){
				setValidtoken(true)
				setCheckToken(true)
			} else {
				setCheckToken(true)
				// if token not valid then logged-out user
				let isDone = await logOutHandler()
				if(isDone){
					setAuth(null, true)
				}
			}
		})
	}, [auth])
	
	if(!checkToken) {
		return <Loader loaderOptions={{color: "green"}} className="relative flex justify-center top-40"/>
	}
	
	if ((checkToken && !validToken) || !auth){
		return <Navigate to="/login" state={{from: location.pathname}} />
	}
	
	return props.children
	
	
};

export default PrivateRoute;
