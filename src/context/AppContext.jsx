import {createContext, useState} from "react";

export const AppContext = createContext(null)

/**
 type Service = {
    _id: ObjectId
    title: string
    image: string
    description: string
	price: number
	email: string
    userId: string
    username: string
    userPhoto: string
    createdAt: Date
	updatedAt: Date
  }
 
  type Review = {
    _id: ObjectId
    userId: string
	serviceId: string
	title: string
	summary: string
	rate: number
	username: string
	userPhoto: string
	createdAt: Date
	updatedAt: Date
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