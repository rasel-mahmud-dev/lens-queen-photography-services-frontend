import React, {useState} from "react";
import {PhotoProvider, PhotoView} from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import Button from "../Button/Button.jsx";
import {Link} from "react-router-dom";

function Service({_id, price, image, description}) {
	const [setImageView] = useState(false);
	
	return (
		<PhotoProvider src={image}>
			<div className="card overflow-hidden !p-0">
				<PhotoView src={image}>
					<img src={image} alt="" onClick={() => setImageView(true)}/>
				</PhotoView>
				<div className="p-4">
					<h5 className="text-xl font-medium tracking-tight text-dark-700 pb-3">{name}</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						{description.length > 100 ? description.substring(0, 100) + "..." : description}
					</p>
					<div className="flex items-center justify-between">
						<h5>${price}</h5>
						<Link to={`/service/${_id}`}>
							<Button className="bg-primary-400/10 !outline-1 outline-amber-200">Detail</Button>
						</Link>
					</div>
				</div>
			</div>
		</PhotoProvider>
	);
}

export default Service;
