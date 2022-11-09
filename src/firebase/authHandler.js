import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";

import { generateAccessTokenAction} from "../context/actions.js";

const auth = getAuth();

export function loginViaEmailAndPassword(email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
			if(result.user) {
				await generateAccessTokenAction(result.user)
				resolve(result.user);
			} else {
				reject("");
			}
        } catch (ex) {
            reject(ex);
        }
    });
}

export function updateUserInfo(currentUser, { displayName, photoURL }) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await updateProfile(currentUser, {
                displayName: displayName,
                photoURL: photoURL,
            });
            resolve(result);
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
				// generate  access token from backend
				await generateAccessTokenAction(user)
			}
	       
            resolve(user);
        } catch (ex) {
            reject(ex);
        }
    });
}

export function logOutHandler() {
    return new Promise(async (resolve, reject) => {
        try {
            await signOut(auth);
			localStorage.removeItem("token")
            resolve("successfully logout");
        } catch (ex) {
            reject(ex);
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