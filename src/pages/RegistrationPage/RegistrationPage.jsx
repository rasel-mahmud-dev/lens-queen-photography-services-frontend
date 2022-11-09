import React, {useContext, useState} from "react";
// import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import InputGroup from "../../components/InputGroup/InputGroup.jsx";
import HttpResponse from "../../components/HttpResponse/HttpResponse.jsx";
import SocialLogin from "../../components/SocialLogin/SocialLogin.jsx";
import Divider from "../../components/Divider/Divider.jsx";
import validator from "../../utils/validator.js";
import SEO from "../../components/SEO/SEO.jsx";
import {firebaseErrorHandling, loginWithGoogle} from "../../firebase/authHandler.js";
import useToast from "../../hooks/useToast.jsx";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import {generateAccessTokenAction} from "../../context/actions.js";

const RegistrationPage = () => {
	const {
		state: {auth},
		actions: {setAuth},
	} = useContext(AppContext);
	
	const navigate = useNavigate();
	const [toast] = useToast();
	
	const [userData, setUserData] = useState({
		username: {
			value: "",
			validation: {
				required: "Username Required",
			},
		},
		avatar: {
			value: "",
			validation: {},
		},
		email: {
			value: "",
			validation: {
				required: "Email Required",
			},
		},
		password: {
			value: "",
			validation: {
				required: "Password required",
				minLength: {value: 6, message: "Password should be min 6 character"},
			},
		},
		confirmPassword: {
			value: "",
			validation: {
				required: "confirmPassword required",
				minLength: {value: 6, message: "confirmPassword should be min 6 character"},
			},
		},
	});
	
	const location = useLocation();
	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});
	
	const firebaseAuth = getAuth()
	
	// handle to registration
	const handleSubmit = async (e) => {
		e.preventDefault();
		setHttpResponse((p) => ({...p, loading: false, message: ""}));
		
		let isCompleted = true;
		let updatedUserData = {...userData};
		
		let errorMessage = "";
		
		let payload = {};
		
		// check validation before submit form
		for (let key in updatedUserData) {
			if (updatedUserData[key]?.validation) {
				let validate = validator(updatedUserData[key]?.validation, updatedUserData[key].value);
				if (validate) {
					isCompleted = false;
					errorMessage = validate;
				} else {
					payload[key] = updatedUserData[key].value;
				}
			} else {
				payload[key] = updatedUserData[key].value;
			}
		}
		
		if (!isCompleted) {
			setUserData(updatedUserData);
			setHttpResponse((p) => ({...p, loading: false, message: errorMessage}));
			return;
		}

		if(userData.password.value !== userData.confirmPassword.value){
			let msg = "Confirm password not matched"
			toast.error(msg)
			return setHttpResponse((p) => ({...p, loading: false, message: msg}));
		}
		
		setHttpResponse((p) => ({...p, loading: true}));
		
		try {
			const result = await createUserWithEmailAndPassword(firebaseAuth, userData.email.value, userData.password.value);
			// if registration successful then update user profile
			if (result?.user) {
				
				updateProfile(firebaseAuth.currentUser, {
					displayName: userData.username.value,
					photoURL: userData.avatar.value
				})
					.then(() => {
						// also update client side auth data
						setAuth({
							...auth,
							displayName: userData.username.value,
							photoURL: userData.avatar.value
						});
						
						// generate new access token
						generateAccessTokenAction(result.user)
						
						if (location.state && location.state.from) {
							navigate(location.state.from, { replace: true });
						} else {
							navigate("/", { replace: true });
						}
					})
					.catch(() => {});
			}
		}catch (ex){
			let message = firebaseErrorHandling(ex?.code)
			setHttpResponse((p) => ({...p, loading: false, message}));
			toast.error(message)
		}
	};
	
	// store value when input changes
	function handleChange(name, value) {
		setUserData((prevState) => {
			return {
				...prevState,
				[name]: {
					...prevState[name],
					value: value,
				},
			};
		});
	}
	
	// password reset mail send form
	function passwordResetModal() {
		return <Modal title="Reset Password" className="max-w-sm" id="4"></Modal>;
	}
	
	return (
		<div className="py-4 mx-4">
			<SEO title="Registration in Lens queen"/>
			<div
				className="card max-w-lg mx-auto px-6 py-6">
				<h1 className="section-title">Registration</h1>

				<HttpResponse state={httpResponse}/>
				
				{passwordResetModal()}
				
				<form onSubmit={handleSubmit}>
					<InputGroup
						name="username"
						placeholder="Username"
						label="User"
						onChange={handleChange}
						validation={userData.username.validation}
					/>

					<InputGroup
						name="email"
						placeholder="Enter email"
						label="Email"
						type="email"
						onChange={handleChange}
						validation={userData.email.validation}
					/>

					<InputGroup
						name="avatar"
						placeholder="Your image"
						label="Avatar"
						onChange={handleChange}
						validation={userData.avatar.validation}
					/>

					<InputGroup
						name="password"
						label="Password"
						type="password"
						onChange={handleChange}
						validation={userData.password.validation}
						placeholder="Your password"
					/>

					<InputGroup
						name="confirmPassword"
						label="Confirm password"
						type="password"
						onChange={handleChange}
						validation={userData.confirmPassword.validation}
						placeholder="Confirm password"
					/>

					<Button className="btn-primary w-full mt-6" type="submit">
						Register
					</Button>

					<Divider text="OR" color="bg-dark-10/50" className="my-4"/>

					<SocialLogin loginWithGoogle={loginWithGoogle}/>

					<p className="text-center mb-4 mt-6 dark:text-neutral-400">
						Already have an Account?
						<Link
							to="/login"
							state={location.state}
							className="font-medium text-blue-500 text-link ml-2 "
						>
							Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default RegistrationPage;
