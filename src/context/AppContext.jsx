import {createContext, useState} from "react";

export const AppContext = createContext(null)

function AppContextProvider(props){
	
	const [state, setState] = useState({
		auth: null,
		services: null
	})
	
	const value = {
		state,
		actions: {
			setAuth: (user, isAuthLoaded) => setState((prev) => ({ ...prev, isAuthLoaded: isAuthLoaded,  auth: user })),
			setServices: function (data){
				setState((prevState) => ({
					...prevState,
					services: data
				}))
			}
		}
	}
	
	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	)
}

export default AppContextProvider