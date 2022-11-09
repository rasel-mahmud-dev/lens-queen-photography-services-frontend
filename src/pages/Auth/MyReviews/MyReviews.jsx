import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext.jsx";
import { fetchReviewByUserIdAction } from "../../../context/actions.js";
import Rating from "../../../components/Rating/Rating.jsx";
import HttpResponse from "../../../components/HttpResponse/HttpResponse.jsx";
import { FaPenAlt, FaTrash } from "react-icons/all";
import AddReviewModal from "../AddReviewModal/AddReviewModal.jsx";
import SEO from "../../../components/SEO/SEO.jsx";

const MyReviews = () => {
	const {
		state: { auth },
	} = useContext(AppContext);

	const [reviews, setReviews] = useState([]);

	const [updateReviewId, setUpdateReviewId] = useState("");

	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		message: "",
		loading: false,
	});

	useEffect(() => {
		(async function () {
			setHttpResponse({ ...httpResponse, message: "", loading: true });
			if (auth) {
				try {
					let reviews = await fetchReviewByUserIdAction(auth.userId);
					setReviews(reviews);
					setHttpResponse({ isSuccess: true, message: "", loading: false });
				} catch (ex) {
					console.log(ex);
					setHttpResponse({ isSuccess: false, message: ex.message, loading: false });
				}
			}
		})();
	}, [auth]);

	function handleDeleteReview(reviewId) {}

	return (
		<div className="container py-8">
			<SEO title="My reviews in Lens queen" />

			<AddReviewModal
				isOpen={updateReviewId}
				reviewId={updateReviewId}
				onCloseModal={() => setUpdateReviewId("")}
			/>

			<h1 className="text-4xl font-semibold text-center">My Reviews</h1>

			<HttpResponse
				className="flex justify-center mt-10"
				loaderTitle="Fetching My Reviews"
				state={httpResponse}
			/>

			{!httpResponse.loading && reviews.length === 0 && (
				<div>
					<h1 className="text-xl font-semibold text-center">There are No Review</h1>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{reviews?.map((review) => (
					<div className="shadow-light rounded-lg bg-white p-4">
						<h2 className="text-lg font-medium mt-2">{review?.service.name}</h2>

						<div className="mt-2">
							<h3 className="text-md font-medium mt-2">{review.title}</h3>
							<Rating rate={review.rate} />
							<p className="para py-4">{review.description}</p>
						</div>

						<div>
							<div className="flex items-center gap-x-2">
								<img
									className="w-8 rounded-full"
									src="https://www.elegantthemes.com/images/faces/suzi.png"
									alt=""
								/>
								<h4 className="font-semibold text-dark-700">{review.name}</h4>
							</div>
							<div className="flex justify-end gap-x-3">
								<div
									onClick={() => setUpdateReviewId(review._id)}
									className="h-7 w-7 border border-primary-600 hover:bg-primary-500/10 text-primary-600 flex cursor-pointer items-center justify-center rounded-full"
								>
									<FaPenAlt className="text-xs" />
								</div>
								<div
									onClick={() => handleDeleteReview(review._id)}
									className="h-7 w-7 border border-red-500 hover:bg-red-500/10 text-red-500 flex cursor-pointer items-center justify-center rounded-full"
								>
									<FaTrash className="text-xs" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyReviews;
