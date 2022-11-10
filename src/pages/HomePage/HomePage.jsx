import Button from "components/Button/Button";
import SEO from "components/SEO/SEO";
import MyWorkSection from "pages/HomePage/MyWorkSection";
import ServicesSection from "pages/HomePage/ServicesSection";
import Testimonials from "pages/HomePage/Testimonials";
import React, { useEffect, useState } from "react";
import {fetchServicesAction} from "src/context/actions/serviceAction";

const HomePage = () => {
	const [services, setServices] = useState([]);
	

	useEffect(() => {
		let options = {
			pagination: { perPage: 3, pageNumber: 1 },
		};
		fetchServicesAction(options).then((r) => {
			setServices(r);
		});
	}, []);

	return (
		<div className="">
			<SEO title="Homepage of lens queen" />
			<div className="relative">
				<img src="/banner-wide-image3.jpg" alt="" className="brightness-50" />
				<div className="absolute top-1/4 left-1/2 transform -translate-x-1/2  p-4">
					{/*<h1 className="font-playfair font-bold text-2xl lg:text-5xl !text-white">Make Your Wedding A Wonderful Story</h1>*/}
					<h1 className="font-playfair font-bold text-2xl lg:text-5xl !text-white">
						Welcome to Lens Queen Photography
					</h1>
					<p className="text-dark-10 mt-10">
						Quam etiam nunc fusce consectetuer libero tellus facilisis iaculis tempor senectus arcu
						Quam etiam nunc fusce consectetuer libero tellus facilisis iaculis tempor senectus arcu
					</p>
					<Button className="btn-primary mt-4">Explore More</Button>
				</div>
			</div>

			<div className="container">
				<ServicesSection services={services} />
				<MyWorkSection />
				<Testimonials />
			</div>
		</div>
	);
};

export default HomePage;
