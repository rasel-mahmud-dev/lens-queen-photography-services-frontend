import Button from "components/Button/Button";
import HttpResponse from "components/HttpResponse/HttpResponse";
import ImagePicker from "components/ImagePicker/ImagePicker";
import InputGroup from "components/InputGroup/InputGroup";
import SEO from "components/SEO/SEO";
import React, {useContext, useEffect, useState} from "react";
// import { useForm } from "react-hook-form";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
	addServiceAction,
	fetchServiceAction,
	updateServiceAction
} from "src/context/actions/serviceAction";
import {AppContext} from "src/context/AppContext";
import useToast from "src/hooks/useToast";
import validator from "src/utils/validator";




const AddServicePage = () => {
	
	const { state: { auth }, actions: {setNewService} } = useContext(AppContext)
	
	const {serviceId} = useParams()
	const [service, setService] = useState(null)
	
	const navigate = useNavigate();
	const [toast] = useToast();
	const [serviceData, setServiceData] = useState({
		title: {
			value: "",
			validation: {
				required: "Title Required",
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
	
	// if update service
	useEffect(()=>{
		if(serviceId){
			fetchServiceAction(serviceId).then(data=>{
				if(data){
					let updatedServiceData = {...serviceData}
					for (let serviceDataKey in serviceData) {
						updatedServiceData[serviceDataKey] = {
							...updatedServiceData[serviceDataKey],
							value: data[serviceDataKey]
						}
					}
					setServiceData(updatedServiceData)
					setService(data)
				}
			}).catch(ex=>{
				setService(null)
			})
		}
	}, [serviceId])

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
			setServiceData(updatedServiceData);
			setHttpResponse((p) => ({ ...p, loading: false, message: errorMessage }));
			return;
		}
		
		setHttpResponse(p => ({ ...p, loading: true }));
		try {
			let data  = {
				title: payload.title,
				username: auth.displayName,
				description: payload.description,
				price: payload.price,
				image: payload.image
			}
			
			let formData = new FormData()
			for (let dataKey in data) {
				formData.append(dataKey, data[dataKey])
			}
			
			if(serviceId && service) {
				let updatedData = await updateServiceAction(serviceId, formData)
				if(updatedData) {
					toast.success("Service Update successfully");
				}
			} else{
				let newService = await addServiceAction(formData)
				setNewService(newService)
				toast.success("Service added successfully");
			}
			
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
		setServiceData((prevState) => {
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
		<div className='px-3'>
			<SEO title="Add new service in Lens queen" />
			<div className="shadow-around bg-white  max-w-lg mx-auto m-4 px-6 py-4 card ">
				<h1 className="card-title">{serviceId ? "Update Service" : "New Service"}</h1>

				<HttpResponse state={httpResponse} />

				<form onSubmit={handleSubmit}>
					<InputGroup
						name="title"
						placeholder="Service title"
						label="Title"
						defaultValue={serviceData.title.value}
						onChange={handleChange}
						validation={serviceData.title.validation}
					/>
					
					<InputGroup
						name="price"
						placeholder="Service price"
						label="Price"
						type="number"
						defaultValue={serviceData.price.value}
						onChange={handleChange}
						validation={serviceData.price.validation}
					/>
					<ImagePicker
						name="image"
						placeholder="Service image"
						label="Image"
						defaultValue={serviceData.image.value}
						onChange={handleChange}
						validation={serviceData.image.validation}
					/>
					
					<InputGroup
						inputClass="h-40"
						name="description"
						placeholder="Service description"
						label="Description"
						as="textarea"
						defaultValue={serviceData.description.value}
						onChange={handleChange}
						validation={serviceData.description.validation}
					/>
					
					<Button className="btn-primary w-full mt-6" type="submit">
						{serviceId ? "Update" : "Add Service" }
					</Button>
				</form>
			</div>
		</div>
	);
};

export default AddServicePage;
