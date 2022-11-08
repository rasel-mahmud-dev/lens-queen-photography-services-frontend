import React, {useEffect, useState} from 'react';
import Service from "../../components/Service/Service.jsx";
import {api} from "../../axios/axios.js";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";


const ServicesPage = () => {
	
	const [services, setServices] = useState([])
	
	useEffect(()=>{
		api.get("/api/services").then(({status, data})=>{
			setServices(data)
		})
	}, [])
	
	
	return (
		<div>
			
			<div>
				<Link to="/add-service"><Button className="btn-primary">Add Service</Button></Link>
			</div>
			
			<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 mt-20 gap-4">
				{services.map((item) => (
					<Service key={item._id} {...item} />
				))}
			</div>
        </div>
	);
};

export default ServicesPage;
