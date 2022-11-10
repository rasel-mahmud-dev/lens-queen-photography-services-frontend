import React, {useState} from "react";
import {FaPenAlt, FaTrash} from "react-icons/all.js";
import Avatar from "src/components/Avatar/Avatar";
import Rating from "src/components/Rating/Rating.jsx";

const Review = ({review, setUpdateReviewId, handleDeleteReview, isDisableAction = false}) => {
	const [showMoreId, setShowMoreId] = useState(-1);
	
	return (
		<div className="shadow-light rounded-lg bg-white p-4 flex flex-col justify-between">
			<div>
				{review?.service?.title && (
					<h2 className="text-lg font-medium mb-4">{review?.service?.title}</h2>
				)}
				<div className="flex items-start justify-between ">
					<div className="flex items-start gap-x-2">
						<div>
							<Avatar src={review.image} className="w-8" username={review.username}/>
						</div>
						<div className="">
							<h4 className="font-medium text-dark-400">{review.username}</h4>
							<Rating rate={review.rate}/>
						</div>
					</div>
					<div className="flex items-center justify-between">
						{!isDisableAction && (
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
						)}
					</div>
				</div>

				<p className="text-dark-200 py-4">
					{showMoreId === review._id ? (
						<span>
							{review.text}
							<span
								className="text-blue-400 hover:text-blue-600 cursor-pointer  ml-1"
								onClick={() => setShowMoreId(showMoreId === review._id ? -1 : review._id)}
							>
								less
							</span>
						</span>
					) : review.text.length > 150 ? (
						<span>
							{review.text.substring(0, 150)}...
							<span
								className="text-blue-400 hover:text-blue-600 cursor-pointer ml-1"
								onClick={() => setShowMoreId(showMoreId === review._id ? -1 : review._id)}
							>
								more
							</span>
						</span>
					) : (
						review.text
					)}
				</p>
			</div>
			<div>
				<span className="text-sm font-normal text-dark-200">
					Posted on {new Date(review.createdAt).toDateString()}{" "}
					{new Date(review.createdAt).toLocaleTimeString()}
				</span>
			</div>
		</div>
	);
};

export default Review;