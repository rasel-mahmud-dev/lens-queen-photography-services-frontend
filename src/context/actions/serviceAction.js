import getApiWithToken, {api} from "src/axios/axios";



export function checkTokenValidation() {
	return new Promise(async (resolve, _) => {
		try {
			let {status } =  await getApiWithToken().get("/api/auth/validate-token")
			if(status === 200){
				resolve(true)
			} else {
				resolve(false)
			}
		} catch (ex) {
			resolve(false)
		}
	});
}

// add service action
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

// update service data
export function updateServiceAction(serviceId, serviceData) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, data } = await getApiWithToken().patch("/api/service/"+serviceId, serviceData);
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

export function fetchServicesCountAction() {
	return new Promise(async (resolve, _) => {
		try {
			const { status, data } = await api.get("/api/services-count");
			if (status === 200) {
				resolve(data.total);
			}
		} catch (ex) {
			resolve(0);
		}
	});
}

export function fetchServicesAction(options) {
	return new Promise(async (resolve, reject) => {
		try {
			
			let query = ""
			const { pagination } = options
			if(pagination){
				query = `?perPage=${pagination.perPage}&pageNumber=${pagination.pageNumber}`
			}
			
			const { status, data } = await api.get("/api/services"+query);
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

export function deleteServiceAction(serviceId) {
	return new Promise(async (resolve, reject) => {
		try {
			const { status, _ } = await api.delete("/api/service/"+serviceId);
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
