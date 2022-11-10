import Divider from "components/Divider/Divider";
import HttpResponse from "components/HttpResponse/HttpResponse";
import InputGroup from "components/InputGroup/InputGroup";
import Modal from "components/Modal/Modal";
import SEO from "components/SEO/SEO";
import SocialLogin from "components/SocialLogin/SocialLogin";
import React, {useContext, useState} from "react";
import {
	firebaseErrorHandling,
	loginViaEmailAndPassword, loginWithGoogle,
	logOutHandler, passwordResetEmail
} from "src/context/actions/authAction";
import useToast from "src/hooks/useToast";
import validator from "src/utils/validator";
import Button from "../../components/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";


const LoginPage = () => {
	
	const navigate = useNavigate();
	const location = useLocation();
	const [toast] = useToast();
	
	
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
	
	
	const [isResetPasswordFormOpen, setResetPasswordFormOpen] = useState(false)
	

	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});
	
	
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
		
		setHttpResponse((p) => ({...p, loading: true}));
		try {
			let user = await loginViaEmailAndPassword(userData.email.value, userData.password.value);
			if (location.state && location.state.from) {
				navigate(location.state.from, { replace: true });
			} else {
				navigate("/", { replace: true });
			}
			
		} catch (error) {
			let message = firebaseErrorHandling(error?.code);
			setHttpResponse((p) => ({...p, loading: false, message: message}));
			toast.error(message);
			
			// also sign out user if token generate fail
			await logOutHandler()
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
	
	
	function handleResetPasswordAction(event){
		event.preventDefault();

		setHttpResponse(p=>({...p, message: "", loading: true}))
		
		if (!userData.email.value) {
			return setHttpResponse(p=>({...p, loading: false, message: "Please Provide EMail", isSuccess: false}))
		}
		
		passwordResetEmail(userData.email.value)
			.then(() => {
				setHttpResponse({loading: false,  message: "Password Reset Mail has been send. Please check your inbox or spam folder", isSuccess: true})
			})
			.catch((ex) => {
				let message = firebaseErrorHandling(ex.code)
				setHttpResponse({loading: false, message: message, isSuccess: false})
			});
	}
	
	function handleSetResetPasswordForm(){
		setHttpResponse({loading: false, message: "", isSuccess: false})
		setResetPasswordFormOpen(false)
	}
	
	// password reset mail send form
	function passwordResetModal() {
		return <Modal isOpen={isResetPasswordFormOpen} modalClass="top-1/4" onCloseModal={handleSetResetPasswordForm}>
			<h1 className='text-center text-lg font-medium'>Reset Password</h1>
			
			<HttpResponse state={httpResponse}/>
			
			<form onSubmit={handleResetPasswordAction}>
			<InputGroup
				name="email"
				placeholder="Enter email"
				type="email"
				defaultValue={userData.email.value}
				onChange={handleChange}
				validation={userData.email.validation}
			/>
				<Button type="submit" className="btn-primary mx-auto block mt-3">Send Mail</Button>
			</form>
		</Modal>;
	}
	
	return (
		<div className="py-10 mx-4">
			<SEO title="Login in Lens queen"/>
			<div
				className="card max-w-lg mx-auto px-6 py-6">
				<h1 className="card-title">Login</h1>

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
						<label htmlFor="my-modal-4" onClick={()=>setResetPasswordFormOpen(true)} className="link ml-2 text-blue-500 ">
							Click to reset
						</label>
					</div>

					<Button className="btn-primary w-full mt-6" type="submit">
						Login
					</Button>

					<Divider text="OR" color="bg-dark-10/50" className="my-4"/>

					<SocialLogin loginWithGoogle={loginWithGoogle}/>

					<p className="text-center mb-4 mt-6 dark:text-neutral-400">
						Not a member?
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
