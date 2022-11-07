import React from "react";
import ServicesSection from "./ServicesSection.jsx";
import MyWorkSection from "./MyWorkSection.jsx";

const HomePage = () => {
	return (
		<div className="">
			<div className="relative">
				<img src="/banner-wide-image3.jpg" alt="" className="brightness-50" />
				<div className="absolute top-1/4 left-1/2 transform -translate-x-1/2  p-4">
					<h1 className="font-playfair font-bold text-2xl lg:text-5xl !text-white">Make Your Wedding A Wonderful Story</h1>
					<p className='text-dark-10 mt-10'>
						Quam etiam nunc fusce consectetuer libero tellus facilisis iaculis tempor senectus arcu
						Quam etiam nunc fusce consectetuer libero tellus facilisis iaculis tempor senectus arcu
					</p>
					<button className="btn btn-primary mt-4">Explore More</button>
				</div>
			</div>

			<div className="container">
				<ServicesSection />
				<MyWorkSection />
			</div>
		</div>
	);
};

export default HomePage;



