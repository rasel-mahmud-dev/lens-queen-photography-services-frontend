import {api} from "../axios/axios.js";

export function generateAccessToken(user){
	return new Promise((resolve, reject)=>{
		try{
			localStorage.removeItem("token")
			api.post("/api/auth/generate-token", {uid: user.uid, email: user.email}).then(({status, data})=>{
				if(status === 201){
					localStorage.setItem("token", data.token)
					resolve(data.token)
				} else {
					reject("Token Generate error")
				}
			})
		} catch (ex){
			reject(ex)
		}
		
	})
}