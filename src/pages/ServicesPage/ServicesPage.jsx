import React, {useContext, useEffect, useState} from "react";
import Service from "../../components/Service/Service.jsx";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import {BsPlusSquareDotted} from "react-icons/all.js";
import {fetchServicesAction} from "../../context/actions.js";
import SEO from "../../components/SEO/SEO.jsx";


const ServicesPage = () => {
	const {
		state: { services },
		actions: { setServices },
	} = useContext(AppContext);
	
	const [isLoadService, setLoadService] = useState(false)
	
	

	useEffect(() => {
		setLoadService(true)
		fetchServicesAction().then(data=>{
			setServices(data)
			setLoadService(false)
		}).catch((_)=>{
			setServices([])
			setLoadService(false)
		})
	}, []);
	
	return (
		<div className="container my-4">
			
			<SEO title="Services Page in lens queen " />
			
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium">Services</h1>
				<Link to="/add-service" className="">
					<Button className="btn-primary flex items-center gap-x-2 ">
						<BsPlusSquareDotted className="text-white" />
						Add Service</Button>
				</Link>
			</div>
			
			{(!isLoadService && services.length === 0) && (
				<h1 className="text-2xl text-center mt-20 font-medium">No services Found</h1>
			)}
			
			{ (!isLoadService && services)  ? (
				<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 mt-10 gap-4">
					{services.map((item) => (
						<Service key={item._id} {...item} />
					))}
				</div>
			) : (
				<div><Loader title="Loading services" className="flex justify-center mt-32"/></div>
			)}
		</div>
	);
};

export default ServicesPage;
