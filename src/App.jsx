import React, { useContext, useEffect } from "react";

import "./App.css";

// firebase initialize
import "./firebase/index.js";

import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./context/AppContext.jsx";
import useToast from "./hooks/useToast.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
	const {
		actions: { setAuth },
	} = useContext(AppContext);

	const [_, ToastContainer] = useToast();

	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuth(
					{
						uId: user.uid,
						displayName: user.displayName,
						email: user.email,
						userId: user.uid,
						photoURL: user.photoURL,
					},
					true
				);
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
