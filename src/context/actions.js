import getApiWithToken, { api } from "../axios/axios.js";

export function generateAccessTokenAction(user) {
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

export function addServiceAction(serviceData) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await getApiWithToken().post("/api/service", serviceData);
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

export function fetchServicesAction() {
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
export function fetchServiceAction(serviceId) {
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
export function addReviewAction(serviceId, review) {
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


// fetch all review for individual services
export function fetchReviewByServiceIdAction(serviceId) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await api.get("/api/reviews/?serviceId="+serviceId);
			if (status === 200) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

// fetch all my reviews
export function fetchReviewByUserIdAction(userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await api.get("/api/reviews/?userId="+userId);
			if (status === 200) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}