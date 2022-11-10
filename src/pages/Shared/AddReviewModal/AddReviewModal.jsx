import Button from "components/Button/Button";
import HttpResponse from "components/HttpResponse/HttpResponse";
import InputGroup from "components/InputGroup/InputGroup";
import Modal from "components/Modal/Modal";
import RatingChooser from "components/RatingChooser/RatingChooser";
import React, {useContext, useEffect, useState} from "react";
import {
	addReviewAction,
	fetchReviewByIdAction,
	updateReviewAction
} from "src/context/actions/reviewAction";
import {AppContext} from "src/context/AppContext";
import useToast from "src/hooks/useToast";
import resetFormValue from "src/utils/resetFormValue";
import validator from "src/utils/validator";



const AddReviewModal = ({isOpen, reviewId, serviceId, contentSpaceY= 10, backdropClass, onAddReview, onUpdateReview, onCloseModal}) => {
	const {
		state: {auth},
	} = useContext(AppContext);
	
	
	const [toast] = useToast();
	const [reviewData, setReviewData] = useState({
		text: {
			value: "",
			validation: {
				required: "Review text Required",
			},
		},
		rate: {
			value: "",
			validation: {
				required: "Please select a rate number",
			},
		},
	});
	
	const [updateReview, setUpdateReview] = useState(null)
	
	// for update review
	useEffect(()=>{
		if(reviewId) {
			fetchReviewByIdAction(reviewId).then(review=>{
				setUpdateReview(review)
				setReviewData({
					...reviewData,
					text: {
						...reviewData.text,
						value: review.text,
					},
					rate: {
						...reviewData.rate,
						value: review.rate,
					}
					
				})
			}).catch(ex=>{})
		}
	}, [reviewId])
	
	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});
	
	

	
	// update and add new review
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
				username: auth.displayName,
				userPhoto: auth.photoURL,
				text: payload.text,
				rate: payload.rate,
			};
			
			// update review
			if(reviewId && updateReview){
				let data = await updateReviewAction(updateReview._id, payloadData);
				onUpdateReview(updateReview._id, data)
				setHttpResponse({
					loading: false,
					isSuccess: true
				});
				
				toast.success("Your review had been updated");
			
			} else {
				// add new review
				let data = await addReviewAction(serviceId, payloadData);
				onAddReview(data)
				setHttpResponse({
					loading: false,
					isSuccess: true
				});
				toast.success("Your review added successfully");
			}
			
			// clear fetched review state
			setUpdateReview(null)
			setReviewData(resetFormValue(reviewData))
			onCloseModal()
			
		} catch (error) {
			let message = error.message;
			setHttpResponse({loading: false, isSuccess: false, message: message});
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
							inputClass="h-40"
							name="text"
							placeholder="Review Text"
							label="Review Text"
							defaultValue={reviewData.text.value}
							as="textarea"
							onChange={handleChange}
							validation={reviewData.text.validation}
						/>

						<RatingChooser
							name="rate"
							total={5}
							placeholder="Review Rate"
							label="Rate"
							defaultValue={reviewData.rate.value}
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