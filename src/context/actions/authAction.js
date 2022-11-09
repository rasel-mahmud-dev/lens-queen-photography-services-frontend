import {
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	sendPasswordResetEmail,
} from "firebase/auth";

import {api} from "src/axios/axios";


export function generateAccessTokenAction(userId, email) {
	return new Promise(async (resolve, reject) => {
		try {
			localStorage.removeItem("token");
			let { status, data } = await api.post("/api/auth/generate-token", {
				userId,
				email
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

const auth = getAuth();

export function loginViaEmailAndPassword(email, password) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			if(result.user) {
				await generateAccessTokenAction(result.user.uid, result.user.email)
				resolve(result.user);
			} else {
				reject("");
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

export function passwordResetEmail(email) {
	return new Promise(async (resolve, reject) => {
		try {
			let doc = await sendPasswordResetEmail(auth, email);
			resolve(doc);
		} catch (ex) {
			reject(ex);
		}
	});
}

export function loginWithGoogle() {
	const googleProvider = new GoogleAuthProvider();
	return new Promise(async (resolve, reject) => {
		try {
			const { user } = await signInWithPopup(auth, googleProvider);
			if(user){
				resolve(user);
			}
		} catch (ex) {
			reject(ex);
		}
	});
}

export function logOutHandler() {
	return new Promise(async (resolve, _) => {
		try {
			await signOut(auth);
			localStorage.removeItem("token")
			resolve(true);
		} catch (ex) {
			resolve(false)
		}
	});
}

export function firebaseErrorHandling(code){
	console.log(code)
	let message = "Internal Error. Please try again"
	if(!code || typeof code !== "string"){
		message = "Internal Error. Please try again"
	}
	else  if(code.includes("network-request-failed")){
		message = "Please Check your internet connection"
		
	} else if (code === "auth/wrong-password") {
		message = "Your password is incorrect";
		
	} else if (code.includes("missing-email")) {
		message = "You are not registered, Please registration";
		
	} else if (code === "auth/user-not-found") {
		message = "You are not registered";
	} else if (code === "auth/email-already-in-use") {
		message = "This email is already Registered."
	}
	
	return message
}