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
import {loginWithGoogle} from "../../firebase/authHandler.js";

const LoginPage = () => {
	const {
		actions: {loginViaEmailAndPassword},
	} = useContext(AppContext);
	
	
	
	const navigate = useNavigate();
	
	const [userData, setUserData] = useState({
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
	});
	
	const location = useLocation();
	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setHttpResponse((p) => ({...p, loading: false, message: ""}));
		
		let isCompleted = true;
		let updatedUserData = {...userData};
		
		let errorMessage = "";
		console.log(userData);
		
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
		
		
		setHttpResponse(p=>({ ...p, loading: true, }));
		loginViaEmailAndPassword(userData.email.value, userData.password.value)
			.then((result) => {
				console.log(result)
				// if (location.state && location.state.from) {
				// 	navigate(location.state.from, { replace: true });
				// } else {
				// 	navigate("/", { replace: true });
				// }
			})
			.catch((error) => {
				let message = error.message ? error.message : "Login fail, Please try again";
				if (error.code === "auth/wrong-password") {
					message = "Password doesn't match"
				} else if (error.code === "auth/user-not-found") {
					message = "You are not registered";
				}
				
				setHttpResponse((p) => ({...p, loading: false, message: message}));
				
			});
		
		
		
		// loginAction(payload, dispatch, Scope.CUSTOMER_USER, function (data, errorMessage) {
		//     if (!errorMessage) {
		// 	    location.state?.redirect && navigate(location.state?.redirect);
		//     } else{
		// 	    setHttpResponse({ loading: false, isSuccess: false, message: errorMessage});
		//     }
		// });
	};
	
	// handle send mail for password reset
	// function handlePasswordReset(event) {
	// 	event.preventDefault();
	// 	setErrorMessage("");
	// 	setSuccessMessage("");
	// 	if (!event.target.email.value) {
	// 		return setErrorMessage("Please Give your email");
	// 	}
	// 	passwordResetEmail(event.target.email.value)
	// 		.then((r) => {
	// 			setSuccessMessage(
	// 				"Password Reset Mail has been send. Please check your inbox or spam folder"
	// 			);
	// 		})
	// 		.catch((ex) => {
	// 			setErrorMessage(ex.message);
	// 		});
	// }
	
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
		<div>
			<SEO title="Login in Lens queen" />
			<div
				className="shadow-around bg-base-100 rounded-box max-w-lg mx-auto m-10 px-6 py-6 card login-card">
				<h1 className="section-title">Login</h1>

				<HttpResponse state={httpResponse}/>
				
				{passwordResetModal()}
				
				<form onSubmit={handleSubmit}>
					<InputGroup
						name="email"
						placeholder="Enter email"
						label="Email"
						type="email"
						onChange={handleChange}
						validation={userData.email.validation}
					/>

					<InputGroup
						name="password"
						label="Password"
						type="password"
						onChange={handleChange}
						validation={userData.password.validation}
						placeholder="Your password"
					/>

					<div className="mt-4 text-sm text-dark-100">
						Forget Password?
						<label htmlFor="my-modal-4" className="link ml-2 text-blue-500 ">
							Click to reset
						</label>
					</div>

					<Button className="btn-primary w-full mt-6" type="submit">
						Login
					</Button>

					<Divider text="OR" color="bg-dark-10/50" className="my-4"/>

					<SocialLogin loginWithGoogle={loginWithGoogle}/>

					<p className="text-center mb-4 mt-6 dark:text-neutral-400">
						'Not a member'?
						<Link
							to="/registration"
							state={location.state}
							className="font-medium text-blue-500 text-link ml-2 "
						>
							Create an Account
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
