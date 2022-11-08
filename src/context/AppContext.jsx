import {createContext, useState} from "react";
import {loginViaEmailAndPassword, logOutHandler} from "../firebase/authHandler.js";

export const AppContext = createContext(null)

function AppContextProvider(props){
	
	const [state, setState] = useState({
		auth: null
	})
	
	const value = {
		state,
		actions: {
			loginViaEmailAndPassword,
			logOutHandler,
			setAuth: (user, isAuthLoaded) => setState((prev) => ({ ...prev, isAuthLoaded: isAuthLoaded,  auth: user }))
		}
	}
	
	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	)
}

export default AppContextProvider