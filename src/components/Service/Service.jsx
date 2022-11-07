import React from "react";

function Service({ name, price, image, description }) {
	return (
		<div className="card overflow-hidden !p-0">
			<img src="/banner-wide-image2.jpg" alt="" />
			<div className="p-4">
				<h5 className="text-xl font-medium tracking-tight text-dark-700 pb-3">{name}</h5>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					{description.length > 100 ? description.substring(0, 100) + "..." : description}
				</p>
				<h5>${price}</h5>
			</div>
		</div>
	);
}

export default Service;
