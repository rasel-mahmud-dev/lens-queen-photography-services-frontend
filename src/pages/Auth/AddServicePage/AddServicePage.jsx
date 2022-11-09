import React, {useContext, useState} from "react";
// import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../../components/SEO/SEO.jsx";
import HttpResponse from "../../../components/HttpResponse/HttpResponse.jsx";
import InputGroup from "../../../components/InputGroup/InputGroup.jsx";
import Button from "../../../components/Button/Button.jsx";
import useToast from "../../../hooks/useToast.jsx";
import validator from "../../../utils/validator.js";
import ImagePicker from "../../../components/ImagePicker/ImagePicker.jsx";
import {AppContext} from "../../../context/AppContext.jsx";
import {addServiceAction} from "../../../context/actions.js";


const AddServicePage = () => {
	
	const {state, actions: {setNewService} } = useContext(AppContext)
	
	const navigate = useNavigate();
	const [toast] = useToast();
	const [serviceData, setUserData] = useState({
		name: {
			value: "",
			validation: {
				required: "Email Required",
			},
		},
		image: {
			value: "",
			validation: {
				required: "image Required",
				maxSize: {
					value: 475136, message: "File size should be under 460kb "
				},
			},
		},
		description: {
			value: "",
			validation: {
				required: "Description Required",
			},
		},
		price: {
			value: "",
			validation: {
				required: "Price Required",
			},
		},
	});

	const location = useLocation();
	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHttpResponse((p) => ({ ...p, loading: false, message: "" }));

		let isCompleted = true;
		let updatedServiceData = { ...serviceData };

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
			setUserData(updatedServiceData);
			setHttpResponse((p) => ({ ...p, loading: false, message: errorMessage }));
			return;
		}
		
		setHttpResponse(p => ({ ...p, loading: true }));
		try {
			let data  = {
				name: payload.name,
				description: payload.description,
				price: payload.price,
				image: payload.image,
			}
			let formData = new FormData()
			for (let dataKey in data) {
				formData.append(dataKey, data[dataKey])
			}
			
			let newService = await addServiceAction(formData)
			console.log(newService)
			setNewService(newService)
			if (location.state && location.state.from) {
				navigate(location.state.from, { replace: true });
			} else {
				navigate("/services", { replace: true });
			}
		} catch (error) {
			let message = error.message;
			setHttpResponse((p) => ({ ...p, loading: false, message: message }));
			toast.error(message);
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

	return (
		<div>
			<SEO title="Add new service in Lens queen" />
			<div className="shadow-around bg-white  max-w-lg mx-auto m-10 px-6 py-6 card ">
				<h1 className="section-title">New Service</h1>

				<HttpResponse state={httpResponse} />

				<form onSubmit={handleSubmit}>
					<InputGroup
						name="name"
						placeholder="Service name"
						label="Name"
						onChange={handleChange}
						validation={serviceData.name.validation}
					/>
					
					<InputGroup
						name="price"
						placeholder="Service price"
						label="Price"
						type="number"
						onChange={handleChange}
						validation={serviceData.price.validation}
					/>
					<ImagePicker
						name="image"
						placeholder="Service image"
						label="Image"
						onChange={handleChange}
						validation={serviceData.image.validation}
					/>
					
					<InputGroup
						inputClass="h-40"
						name="description"
						placeholder="Service description"
						label="Description"
						as="textarea"
						onChange={handleChange}
						validation={serviceData.description.validation}
					/>
					
					<Button className="btn-primary w-full mt-6" type="submit">
						Add Service
					</Button>
				</form>
			</div>
		</div>
	);
};

export default AddServicePage;
