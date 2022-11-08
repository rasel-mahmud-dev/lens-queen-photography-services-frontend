import getApiWithToken, { api } from "../axios/axios.js";

export function generateAccessToken(user) {
	return new Promise(async (resolve, reject) => {
		try {
			localStorage.removeItem("token");
			let { status, data } = await api.post("/api/auth/generate-token", {
				uid: user.uid,
				email: user.email,
			});
			if (status === 201) {
				localStorage.setItem("token", data.token);
				resolve(data.token);
			} else {
				reject("Token Generate error");
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

export function addService(serviceData) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = getApiWithToken().post("/api/service", serviceData);
			if (status === 201) {
				resolve(data);
			} else {
				resolve(null);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

export function fetchServices() {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await api.get("/api/services");
			if (status === 200) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}
export function fetchService(serviceId) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await api.get("/api/service/"+serviceId);
			if (status === 200) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

// add a review
export function addReview(serviceId, review) {
	console.log(serviceId, review)
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await getApiWithToken().post("/api/review/"+serviceId, review);
			if (status === 201) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

// fetch all review
export function fetchReviewByServiceId(serviceId) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await api.get("/api/reviews/"+serviceId);
			if (status === 200) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}