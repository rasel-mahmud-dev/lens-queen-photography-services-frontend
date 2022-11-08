import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../context/AppContext.jsx";
import {fetchReviewByUserId} from "../../../context/actions.js";
import Rating from "../../../components/Rating/Rating.jsx";
import Loader from "../../../components/Loader/Loader.jsx";

const MyReviews = () => {
	const {
		state: {auth},
	} = useContext(AppContext);
	
	const [reviews, setReviews] = useState([]);
	
	const [reviewLoading, setReviewLoading] = useState(false);
	
	useEffect(() => {
		(async function () {
			setReviewLoading(true);
			let reviews = await fetchReviewByUserId(auth.userId);
			setReviews(reviews);
			setReviewLoading(false);
		})();
	}, [auth]);
	
	return (
		<div className="container">
			<h1 className="text-4xl font-semibold text-center py-8">My Reviews</h1>
			
			{reviewLoading && (
				<div>
					<Loader title="Fetching My Reviews" className="flex justify-center mt-32"/>
				</div>
			)}
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{reviews?.map((review) => (
					<div className="shadow-light rounded-lg bg-white p-4">
						<div className="flex items-center gap-x-2">
							<img
								className="w-8 rounded-full"
								src="https://www.elegantthemes.com/images/faces/suzi.png"
								alt=""
							/>
							<h4 className="font-semibold text-dark-700">{review.name}</h4>
						</div>
						<div className="mt-2">
							<Rating rate={review.rate}/>
							<h3 className="text-md font-medium mt-2">{review.title}</h3>
							<p className="para">{review.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyReviews;
