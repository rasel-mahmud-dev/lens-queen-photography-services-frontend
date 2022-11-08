import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:4000"
})


export default function getApiWithToken(){
	axios.default.headers["token"] = localStorage.getItem('token') || ""
	return api
}