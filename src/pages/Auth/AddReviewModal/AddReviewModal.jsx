import React, {useContext, useEffect, useState} from "react";
import Modal from "../../../components/Modal/Modal.jsx";
import HttpResponse from "../../../components/HttpResponse/HttpResponse.jsx";
import InputGroup from "../../../components/InputGroup/InputGroup.jsx";
import Button from "../../../components/Button/Button.jsx";
import {AppContext} from "../../../context/AppContext.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useToast from "../../../hooks/useToast.jsx";
import validator from "../../../utils/validator.js";
import RatingChooser from "../../../components/RatingChooser/RatingChooser.jsx";
import {addReviewAction, fetchReviewByIdAction} from "../../../context/actions.js";


const AddReviewModal = ({isOpen, reviewId, serviceId, contentSpaceY= 10, backdropClass, setNewReview,  onCloseModal}) => {
	const {
		state: {auth},
	} = useContext(AppContext);
	
	
	const navigate = useNavigate();
	const [toast] = useToast();
	const [reviewData, setReviewData] = useState({
		title: {
			value: "",
			validation: {
				required: "Review Title Required",
			},
		},
		description: {
			value: "",
			validation: {
				required: "Review Description Required",
			},
		},
		rate: {
			value: "",
			validation: {
				required: "Please select a rate number",
			},
		},
	});
	
	useEffect(()=>{
		if(reviewId) {
			fetchReviewByIdAction(reviewId).then(review=>{
				console.log(review)
			}).catch(ex=>{
			
			})
		}
	}, [reviewId])
	
	const location = useLocation();
	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setHttpResponse((p) => ({...p, loading: false, message: ""}));
		
		let isCompleted = true;
		let updatedServiceData = {...reviewData};
		
		let errorMessage = "";
		
		let payload = {};
		
		// check validation before submit form
		for (let key in updatedServiceData) {
			if (updatedServiceData[key]?.validation) {
				let validate = validator(
					updatedServiceData[key]?.validation,
					updatedServiceData[key].value
				);
				if (validate) {
					isCompleted = false;
					errorMessage = validate;
				} else {
					payload[key] = updatedServiceData[key].value;
				}
			} else {
				payload[key] = updatedServiceData[key].value;
			}
		}
		
		if (!isCompleted) {
			setReviewData(updatedServiceData);
			setHttpResponse((p) => ({...p, loading: false, message: errorMessage}));
			return;
		}
		
		setHttpResponse((p) => ({...p, loading: true}));
		try {
			let payloadData = {
				name: auth.displayName,
				image: auth.photoURL,
				title: payload.title,
				description: payload.description,
				rate: payload.rate,
			};
			
			let data = await addReviewAction(serviceId, payloadData);
			onCloseModal()
			setNewReview(data)
			setHttpResponse((p) => ({...p, loading: false, message: "review added successful"}));
			toast.success("Your review added successfully");
			
			
		} catch (error) {
			let message = error.message;
			setHttpResponse((p) => ({...p, loading: false, message: message}));
			toast.error(message);
		}
	};
	
	// store value when input changes
	function handleChange(name, value) {
		setReviewData((prevState) => {
			return {
				...prevState,
				[name]: {
					...prevState[name],
					value: value,
				},
			};
		});
	}
	
	return (
		<Modal isOpen={isOpen} contentSpaceY={contentSpaceY} backdropClass={backdropClass} modalClass="top-1/6"  onCloseModal={onCloseModal}>
			<div>
				<div className="p-2">
					<h1 className="text-2xl text-center font-semibold">{reviewId ? "Update Review" : "Add Review" }</h1>

					<HttpResponse state={httpResponse}/>

					<form onSubmit={handleSubmit}>
						<InputGroup
							name="title"
							placeholder="Review title"
							label="Title"
							onChange={handleChange}
							validation={reviewData.title.validation}
						/>

						<InputGroup
							inputClass="h-40"
							name="description"
							placeholder="Service description"
							label="Description"
							as="textarea"
							onChange={handleChange}
							validation={reviewData.description.validation}
						/>

						<RatingChooser
							name="rate"
							total={5}
							placeholder="Review Rating"
							label="Rating"
							onChange={handleChange}
							validation={reviewData.rate.validation}
						/>

						<Button className="btn-primary w-full mt-6" type="submit">
							{reviewId ? "Update" : "Post" }
						</Button>
					</form>
				</div>
			</div>
		</Modal>
	);
};

export default AddReviewModal;