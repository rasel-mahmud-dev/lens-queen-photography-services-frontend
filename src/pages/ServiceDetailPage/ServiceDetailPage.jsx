import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import { fetchReviewByServiceIdAction, fetchServiceAction } from "../../context/actions.js";
import Rating from "../../components/Rating/Rating.jsx";
import Button from "../../components/Button/Button.jsx";
import AddReviewModal from "../Auth/AddReviewModal/AddReviewModal.jsx";

const ServiceDetailPage = () => {
	const { serviceId } = useParams();
	const [serviceDetail, setServiceDetail] = useState(null);

	const [reviews, setReviews] = useState([]);

	const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

	function handleCloseAddReviewModal() {
		setOpenAddReviewModal(!openAddReviewModal);
	}

	useEffect(() => {
		fetchServiceAction(serviceId)
			.then(async (data) => {
				setServiceDetail(data);
				let d = await fetchReviewByServiceIdAction(serviceId);
				setReviews(d);
			})
			.catch((ex) => {});
	}, [serviceId]);
	
	
	function handleAddNewReview(review){
		setReviews([...reviews, review])
	}

	return (
		<div className="pb-10 pt-4">
			<h1 className="section-title">Service Details</h1>

			<AddReviewModal
				setNewReview={handleAddNewReview}
				serviceId={serviceId}
				onCloseModal={handleCloseAddReviewModal}
				isOpen={openAddReviewModal}
				contentSpaceY={300}
				modalClass="!top-40"
			/>

			{serviceDetail ? (
				<div>
					<section className="section">
						<div className="container">
							<img src={serviceDetail.image} alt="" />
							<h1 className="text-3xl font-semibold">{serviceDetail.name}</h1>
							<p className="font-medium mt-2">Price ${serviceDetail.price}</p>
							<p className="mt-4">{serviceDetail.description}</p>
						</div>
					</section>

					<section className="section bg-white px-4">
						<div className="container">
							<h1 className="section-title text-center py-10">
								Customer Reviews About Service
							</h1>

							{reviews.length === 0 && (
								<div>
									<h1 className="text-xl font-semibold text-center">There are No Review</h1>
								</div>
							)}

							<div className="flex justify-center">
								<Button onClick={() => setOpenAddReviewModal(true)} className="btn-primary">
									Add Review
								</Button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
								{reviews.map((review) => (
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
											<Rating rate={review.rate} />
											<h3 className="text-md font-medium mt-2">{review.title}</h3>
											<p className="para">{review.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				</div>
			) : (
				<div>
					<Loader title="Loading Service detail" className="flex justify-center mt-32" />
				</div>
			)}
		</div>
	);
};

export default ServiceDetailPage;

