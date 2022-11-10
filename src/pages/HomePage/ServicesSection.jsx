import Loader from "components/Loader/Loader";
import React, {useEffect, useState} from "react";
import {fetchServicesAction} from "src/context/actions/serviceAction";
import Service from "../../components/Service/Service.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

const ServicesSection = () => {
	
	const [services, setServices] = useState(null);
	
	
	useEffect(() => {
		let options = {
			pagination: { perPage: 3, pageNumber: 1 },
		};
		fetchServicesAction(options).then((r) => {
			setServices(r);
		}).catch(ex=>{
			setServices([])
		})
	}, []);
	
	
	
	return (
		<section className="section">
			<h1 className="section-title">Explore My Top Services</h1>
			{ services && (
				<div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{services?.map((item) => (
					<Service key={item._id} {...item} isDisableAction={true} />
				))}
			</div>
			<div className="mt-8 flex justify-center">
				<Link to="/services">
					<Button className="btn-primary">Show More</Button>
				</Link>
			</div>
				</div>
			) }
			
			
			{ !services && (
				<div><Loader title="Services are fetching" className="flex justify-center my-10"/></div>
			)}

			
			
		</section>
	);
};

export default ServicesSection;