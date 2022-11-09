import HttpResponse from "components/HttpResponse/HttpResponse";
import SEO from "components/SEO/SEO";
import React, { useContext, useEffect, useState } from "react";
import {deleteReviewAction, fetchReviewByUserIdAction} from "src/context/actions/reviewAction";
import {deleteServiceAction} from "src/context/actions/serviceAction";
import {AppContext} from "src/context/AppContext";
import useToast from "src/hooks/useToast";
import Review from "src/pages/Auth/MyReviews/Review";
import AddReviewModal from "src/pages/Shared/AddReviewModal/AddReviewModal";
import catchErrorMessage from "src/utils/catchErrorMessage";


const MyReviews = () => {
	const {
		state: { auth },
	} = useContext(AppContext);

	const [reviews, setReviews] = useState([]);
	const [toast] = useToast();

	const [updateReviewId, setUpdateReviewId] = useState("");

	const [httpResponse, setHttpResponse] = useState({
		isSuccess: false,
		loading: false,
	});

	
	useEffect(() => {
		(async function () {
			setHttpResponse({ ...httpResponse, loading: true });
			if (auth) {
				try {
					let reviews = await fetchReviewByUserIdAction(auth.userId);
					setReviews(reviews);
					setHttpResponse({ isSuccess: true, loading: false });
				} catch (ex) {
					toast.error(catchErrorMessage(ex));
					setHttpResponse({ isSuccess: false, loading: false });
				}
			}
		})();
	}, [auth]);
	
	
	
	// delete review from database and context state
	async function handleDeleteReview(reviewId) {
		try {
			let deleted = await deleteReviewAction(reviewId)
			if (deleted) {
				toast.error("service had been deleted")
				setReviews(reviews.filter((review) => review._id !== reviewId));
			}
		} catch (ex){
			toast.error(catchErrorMessage(ex))
		}
	}
	
	// update review from database and context state
	function handleUpdateReview(reviewId, updatedData) {
		let updatedReview = [...reviews];
		const index = updatedReview.findIndex((review) => review._id === reviewId);
		if(index !== -1) {
			updatedReview[index] = {
				...updatedReview[index],
				...updatedData,
			};
			setReviews(updatedReview);
		}
	}

	return (
		<div className="container py-8">
			<SEO title="My reviews in Lens queen" />

			<AddReviewModal
				isOpen={updateReviewId}
				reviewId={updateReviewId}
				onUpdateReview={handleUpdateReview}
				onCloseModal={() => setUpdateReviewId("")}
			/>

			<h1 className="text-3xl font-semibold text-center">My Reviews</h1>

			<HttpResponse
				className="flex justify-center mt-10"
				loaderTitle="Fetching My Reviews"
				state={httpResponse}
			/>

			{!httpResponse.loading && reviews.length === 0 && (
				<div>
					<h1 className="text-xl font-semibold text-center">No reviews were added</h1>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{reviews?.map((review) => (
					<Review
						review={review}
						key={review._id}
						setUpdateReviewId={setUpdateReviewId}
					    handleDeleteReview={handleDeleteReview}
					/>
				))}
			</div>
		</div>
	);
};

export default MyReviews;
