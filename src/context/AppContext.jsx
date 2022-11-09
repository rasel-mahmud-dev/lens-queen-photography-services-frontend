import {createContext, useState} from "react";

export const AppContext = createContext(null)

/**
 type Service = {
    name: string
    image: string
    description: string
	email: string
	price: number
    userId: string
    photoURL: string
  }
 
 
 type Auth = {
    displayName: string
    email: string
    userId: string
    photoURL?: string
  }
 
 
 */

function AppContextProvider(props){
	
	const [state, setState] = useState({
		auth: null,
		services: []
	})
	
	const value = {
		state,
		actions: {
			setAuth: (user) => setState((prev) => ({ ...prev, auth: user })),
			setServices: function (data){
				setState((prevState) => ({
					...prevState,
					services: data
				}))
			},
			setNewService: function (data){
				setState((prevState) => ({
					...prevState,
					services: [
						...prevState.services,
						data
					]
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