import React from "react";
import Service from "../../components/Service/Service.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

const ServicesSection = ({services}) => {
	
	return (
		<section className="sections">
			<h1 className="section-title">Explore My Top Services</h1>
			<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 mt-20 gap-4">
				{services?.map((item) => (
					<Service key={item._id} {...item} />
				))}
			</div>
			<div className="mt-8 flex justify-center">
				<Link to="/services">
					<Button className="btn-primary">Show More</Button>
				</Link>
			</div>
		</section>
	);
};

export default ServicesSection;