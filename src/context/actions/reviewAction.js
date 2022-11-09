// add a review


import getApiWithToken, {api} from "src/axios/axios";

export function addReviewAction(serviceId, review) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await getApiWithToken().post("/api/review/" + serviceId, review);
			if (status === 201) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

// update a review action
export function updateReviewAction(reviewId, review) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await getApiWithToken().patch("/api/review/" + reviewId, review);
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
			const { status, data } = await api.get("/api/reviews/?serviceId=" + serviceId);
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
			const { status, data } = await api.get("/api/reviews/?userId=" + userId);
			if (status === 200) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

// fetch all my reviews
export function fetchReviewByIdAction(reviewId) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await api.get("/api/review/" + reviewId);
			if (status === 200) {
				resolve(data);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}


export function deleteReviewAction(reviewId) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, _ } = await api.delete("/api/review/"+reviewId);
			if (status === 201) {
				resolve(true);
			} else{
				resolve(true);
			}
			
		} catch (ex) {
			reject(ex);
		}
	});
}
