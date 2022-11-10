import React, { useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// firebase initialize
import "./firebase/index.js";

import Footer from "components/Footer/Footer";
import Navigation from "components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { generateAccessTokenAction, logOutHandler } from "src/context/actions/authAction";
import { checkTokenValidation } from "src/context/actions/serviceAction";
import { AppContext } from "src/context/AppContext";
import useToast from "./hooks/useToast";

import "./App.css";


function App() {
	const {
		actions: { setAuth },
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
				<ToastContainer />
				<Navigation />
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default App;
