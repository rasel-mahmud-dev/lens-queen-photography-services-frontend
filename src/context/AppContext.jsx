import {createContext} from "react";

export const AppContext = createContext(null)

function AppContextProvider(props){
	
	const value = {
		state: {
			auth: null
		},
		actions: {
		
		}
	}
	
	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	)
}

export default AppContextProvider