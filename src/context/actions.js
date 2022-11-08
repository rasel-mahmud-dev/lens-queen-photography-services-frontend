import {api} from "../axios/axios.js";

export function generateAccessToken(user){
	api.post("/api/auth/generate-token", {uid: user.uid, email: user.email}).then(({status, data})=>{
		if(status === 201){
			localStorage.setItem("token", data.token)
		}
	})
}