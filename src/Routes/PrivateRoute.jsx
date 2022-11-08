import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context/AppContext.jsx";
import getApiWithToken, {api} from "../axios/axios.js";
import {Navigate, useLocation} from "react-router-dom";
import Loader from "../components/Loader/Loader.jsx";

const PrivateRoute = (props) => {
	const {state: {auth, authFetched}, actions: {logOutHandler}} = useContext(AppContext)
	const location = useLocation()
	
	const [validToken, setValidtoken] = useState(false)
	const [checkToken, setCheckToken] = useState(false)
	
	useEffect(()=>{
		console.log(localStorage.getItem("token"))
		getApiWithToken().get("/api/auth/validate-token").then(({data})=>{
			setValidtoken(true)
			setCheckToken(true)
		}).catch((ex)=>{
			setCheckToken(true)
			// if token not valid then logged-out user
			logOutHandler()
		})
	}, [auth])
	
	if(!checkToken){
		return  <Loader loaderOptions={{color: "green"}} className="relative flex justify-center top-40" />
	}  else if (checkToken && !validToken){
		return <Navigate to="/login" state={{from: location.pathname}} />
	}
	
	if(validToken){
		return  props.children
	}
	
};

export default PrivateRoute;
