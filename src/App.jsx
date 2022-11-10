import {getAuth, onAuthStateChanged} from "firebase/auth";
import React, {useContext, useEffect} from "react";

import {Outlet} from "react-router-dom";




// firebase initialize
import "./firebase/index.js";

import Footer from "./components/Footer/Footer.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import {generateAccessTokenAction, logOutHandler} from "./context/actions/authAction.js";
import {checkTokenValidation} from "./context/actions/serviceAction.js";
import {AppContext} from "./context/AppContext.jsx";

import "./App.css";

import useToast from "./hooks/useToast.jsx";

function App() {
	const {
		actions: {setAuth},
	} = useContext(AppContext);
	
	const [_, ToastContainer] = useToast();
	
	const auth = getAuth();
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				let userData = {
					displayName: user.displayName,
					email: user.email,
					userId: user.uid,
					photoURL: user.photoURL,
				};
				
				// generate  access token from backend
				let token = localStorage.getItem("token");
				// if token found on localstorage then validate it.
				// if token valid then make user logged
				
				if (token) {
					checkTokenValidation().then((isValid) => {
						if (!isValid) {
							logOutHandler().then((isLogouted) => {
								if (isLogouted) {
									setAuth(null, true);
								}
							});
						} else {
							setAuth(userData, true);
						}
					});
				} else {
					// token not found then generate a new token
					generateAccessTokenAction(user.uid, user.email)
						.then((token) => {
							setAuth(userData, true);
						})
						.catch((ex) => {
							logOutHandler().then((isLogouted) => {
								if (isLogouted) {
									setAuth(null, true);
								}
							});
						});
				}
			} else {
				// User is signed out
				setAuth(null, true);
			}
		});
		
		return () => unsubscribe();
	}, []);
	
	return (
		<div className="App">
			<div className="app-content">
				<ToastContainer/>
				<Navigation/>
				<Outlet/>
			</div>
			<Footer/>
		</div>
	);
}

export default App;
