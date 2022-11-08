import getApiWithToken, {api} from "../axios/axios.js";

export function generateAccessToken(user) {
	return new Promise(async (resolve, reject) => {
		try {
			localStorage.removeItem("token")
			let {status, data} = await api.post("/api/auth/generate-token", {
				uid: user.uid,
				email: user.email
			})
			if (status === 201) {
				localStorage.setItem("token", data.token)
				resolve(data.token)
			} else {
				reject("Token Generate error")
			}
			
		} catch (ex) {
			reject(ex)
		}
		
	})
}

export function addService(serviceData) {
	return new Promise(async (resolve, reject) => {
		try {
			const {status, data} = getApiWithToken().post("/api/service", serviceData)
			if (status === 201) {
				resolve(data)
			} else {
				resolve(null)
			}
			
		} catch (ex) {
			reject(ex)
		}
	})
}