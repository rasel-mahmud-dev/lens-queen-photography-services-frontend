import axios from "axios";

export const api = axios.create({
	// baseURL:  import.meta.env.DEV ? "http://localhost:4000" : "https://lens-queen-api.vercel.app"
	baseURL:  import.meta.env.DEV ? "http://192.168.91.224:4000" : "https://lens-queen-api.vercel.app"
})


export default function getApiWithToken(){
	let token = localStorage.getItem('token')
	api.defaults.headers["token"] = token || ""
	return api
}