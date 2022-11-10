import React, {useState} from "react";
import {FaPenAlt, FaTrash} from "react-icons/all";
import {PhotoProvider, PhotoView} from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {Link} from "react-router-dom";
import Button from "../Button/Button.jsx";

function Service({_id, price, title, image, description, onDelete, isDisableAction=false}) {
	const [setImageView] = useState(false);
	
	return (
		<PhotoProvider src={image}>
			<div className="card overflow-hidden !p-0">
				<div className="flex flex-col justify-between h-full">
					<div>
						<PhotoView src={image}>
							<img src={image} className="w-full" alt={title}
							     onClick={() => setImageView(true)}/>
						</PhotoView>
						<div className="p-4">
							<h5 className="text-xl font-medium tracking-tight text-dark-700 pb-3">{title}</h5>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								{description.length > 100 ? description.substring(0, 100) + "..." : description}
							</p>
						</div>
					</div>

					<div className="flex items-center justify-between px-4 pb-4">
						<h5 className="text-lg font-medium">${price}</h5>

						<div className="flex justify-end items-center gap-x-3">
							{!isDisableAction && (
								<>
									<Link to={`/update-service/${_id}`}>
										<div
											className="h-9 w-9 border border-primary-600 hover:bg-primary-500/10 text-primary-600 flex cursor-pointer items-center justify-center rounded-full">
											<FaPenAlt className="text-sm"/>
										</div>
									</Link>
									<div
										onClick={() => onDelete(_id)}
										className="h-9 w-9 border border-red-500 hover:bg-red-500/10 text-red-500 flex cursor-pointer items-center justify-center rounded-full"
									>
										<FaTrash className="text-sm"/>
									</div>
								</>
							)}
							<Link to={`/service/${_id}`}>
								<Button
									className="btn-primary text-sm !outline-1 outline-amber-200">Detail</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PhotoProvider>
	);
}

export default Service;
