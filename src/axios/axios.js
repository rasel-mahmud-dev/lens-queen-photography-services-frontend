import axios from "axios";

export const api = axios.create({
	baseURL:  import.meta.env.DEV ? "http://localhost:4000" : ""
})


export default function getApiWithToken(){
	let token = localStorage.getItem('token')
	api.defaults.headers["token"] = token || ""
	return api
}