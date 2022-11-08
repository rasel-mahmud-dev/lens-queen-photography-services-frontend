import React, { useContext, useEffect } from "react";
import Service from "../../components/Service/Service.jsx";
import { api } from "../../axios/axios.js";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const ServicesPage = () => {
	const {
		state: { services },
		actions: { setServices },
	} = useContext(AppContext);

	useEffect(() => {
		api.get("/api/services").then(({ status, data }) => {
			if (status === 200) {
				setServices(data);
			}
		});
	}, []);

	return (
		<div className="container">
			<div>
				<Link to="/add-service">
					<Button className="btn-primary">Add Service</Button>
				</Link>
			</div>

			{services ? (
				<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 mt-20 gap-4">
					{services.map((item) => (
						<Service key={item._id} {...item} />
					))}
				</div>
			) : (
				<h1><Loader title="Loading services" className="flex justify-center mt-32"/></h1>
			)}
		</div>
	);
};

export default ServicesPage;
