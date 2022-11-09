import Avatar from "components/Avatar/Avatar";
import React from "react";
import Rating from "../../../components/Rating/Rating.jsx";
import {FaPenAlt, FaTrash} from "react-icons/all.js";

const Review = ({review, setUpdateReviewId, handleDeleteReview}) => {
	return (
		<div className="shadow-light rounded-lg bg-white p-4">
			<h2 className="text-lg font-medium mt-2">{review?.service.title}</h2>

			<div className="mt-2">
				<h3 className="text-md font-medium mt-2 mb-1">{review.title}</h3>
				<Rating rate={review.rate}/>
				<p className="para py-4">{review.description}</p>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<Avatar src={review.image} className="w-7" username={review.username}  />
					<h4 className="font-semibold text-dark-700">{review.username}</h4>
				</div>
				<div className="flex justify-end gap-x-3">
					<div
						onClick={() => setUpdateReviewId(review._id)}
						className="h-7 w-7 border border-primary-600 hover:bg-primary-500/10 text-primary-600 flex cursor-pointer items-center justify-center rounded-full"
					>
						<FaPenAlt className="text-xs"/>
					</div>
					<div
						onClick={() => handleDeleteReview(review._id)}
						className="h-7 w-7 border border-red-500 hover:bg-red-500/10 text-red-500 flex cursor-pointer items-center justify-center rounded-full"
					>
						<FaTrash className="text-xs"/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Review;