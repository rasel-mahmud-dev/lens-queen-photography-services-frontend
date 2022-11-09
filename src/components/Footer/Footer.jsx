import React from "react";
import { Link } from "react-router-dom";
import Social from "./Social.jsx";


const Footer = () => {
	return (
		<>
			<footer className="bg-primary-800 pb-10 py-14">
				<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center gap-6">
					<div className="">
						<h3 className="font-semibold text-gray-50">About Me</h3>
						<p className="text-dark-5 mt-2 text-sm">
							Hi, I’m Rani Queen , a photographer, traveler & blogger. Always Capture the valuable memories that never get back at any costs.
						</p>
						<Social className="flex justify-center" />
					</div>
					
					

					<div className="mt-4 lg:mt-0">
						<h3 className="font-semibold text-gray-50">Contact</h3>
						<ul className="mt-2 text-dark-5 text-sm">
							
							<p>House #20 (3rd Floor) Nikanjia</p>
							<p>Dhaka, BD 10000, Bangladesh</p>
							<p className="mt-1">+88034759435 rani.queen@queen.com</p>
						</ul>
					</div>

					<div className="mt-4 lg:mt-0">
						<h3 className="font-semibold text-gray-50">Quick Links</h3>
						<ul className="mt-2 text-dark-5 text-sm">
							<li className="">
								<Link to="/services" className="hover:text-primary-500">
									Blogs
								</Link>
							</li>
							<li className="pt-1">
								<Link to="/services" className="hover:text-primary-500">
									Services
								</Link>
							</li>
							<li className="pt-1">
								<Link to="/add-service" className="hover:text-primary-500">
									Add Service
								</Link>
							</li>
							<li className="pt-1">
								<Link to="/my-reviews" className="hover:text-primary-500">
									My Reviews
								</Link>
							</li>
						</ul>
					</div>

					
				</div>
			</footer>

			{/**** bottom footer *********/}
			<footer className="bg-primary-800/90 py-4">
				<div className="container flex flex-col md:flex-row text-center md:text-start gap-4 md:gap-4 justify-between text-white">
					<h1>Copyright © {new Date().getFullYear()}</h1>
					<h1>Rasel Mahmud. All Rights Reserved.</h1>
				</div>
			</footer>
		</>
	);
};

export default Footer;
