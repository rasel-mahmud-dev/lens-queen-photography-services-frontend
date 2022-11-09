import React from "react";
import Service from "../../components/Service/Service.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

const ServicesSection = () => {
	const services = [
		{
			_id: "2",
			name: "Wedding Photography Service",
			image: "/banner-wide-image2.jpg",
			price: 30,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolore dolores error facere harum id impedit in labore libero modi, mollitia nulla pariatur quo quos ratione sequi similique ullam voluptates? A aspernatur atque commodi corporis dolorum expedita fugit, harum illum impedit nam nobis omnis provident quos, reprehenderit rerum tempora ullam velit vitae. Ad commodi, doloremque eveniet explicabo itaque laboriosam praesentium ratione similique sint soluta. A deleniti est facilis, necessitatibus saepe tempore. Accusantium debitis dolores in nihil suscipit velit voluptatibus. Autem commodi consequatur culpa cupiditate, deserunt distinctio doloremque, eveniet labore, laboriosam minima minus modi nemo suscipit temporibus tenetur vel voluptas voluptatum!",
		},
		{
			_id: "1232sd13",
			name: "Wedding Photography Service",
			image: "/banner-wide-image2.jpg",
			price: 30,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolore dolores error facere harum id impedit in labore libero modi, mollitia nulla pariatur quo quos ratione sequi similique ullam voluptates? A aspernatur atque commodi corporis dolorum expedita fugit, harum illum impedit nam nobis omnis provident quos, reprehenderit rerum tempora ullam velit vitae. Ad commodi, doloremque eveniet explicabo itaque laboriosam praesentium ratione similique sint soluta. A deleniti est facilis, necessitatibus saepe tempore. Accusantium debitis dolores in nihil suscipit velit voluptatibus. Autem commodi consequatur culpa cupiditate, deserunt distinctio doloremque, eveniet labore, laboriosam minima minus modi nemo suscipit temporibus tenetur vel voluptas voluptatum!",
		},
		{
			_id: "234",
			name: "Wedding Photography Service",
			image: "/banner-wide-image2.jpg",
			price: 30,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolore dolores error facere harum id impedit in labore libero modi, mollitia nulla pariatur quo quos ratione sequi similique ullam voluptates? A aspernatur atque commodi corporis dolorum expedita fugit, harum illum impedit nam nobis omnis provident quos, reprehenderit rerum tempora ullam velit vitae. Ad commodi, doloremque eveniet explicabo itaque laboriosam praesentium ratione similique sint soluta. A deleniti est facilis, necessitatibus saepe tempore. Accusantium debitis dolores in nihil suscipit velit voluptatibus. Autem commodi consequatur culpa cupiditate, deserunt distinctio doloremque, eveniet labore, laboriosam minima minus modi nemo suscipit temporibus tenetur vel voluptas voluptatum!",
		},
	];

	return (
		<section className="sections">
			<h1 className="section-title">Explore My Top Services</h1>
			<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 mt-20 gap-4">
				{services.map((item) => (
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