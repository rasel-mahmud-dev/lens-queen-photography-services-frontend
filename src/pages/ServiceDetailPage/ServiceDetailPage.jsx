import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import Rating from "components/Rating/Rating";
import Review from "components/Review/Review";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchReviewByServiceIdAction } from "src/context/actions/reviewAction";
import { checkTokenValidation, fetchServiceAction } from "src/context/actions/serviceAction";
import { AppContext } from "src/context/AppContext";

import AddReviewModal from "src/pages/Shared/AddReviewModal/AddReviewModal";

const ServiceDetailPage = () => {
	const {
		state: { auth },
	} = useContext(AppContext);

	const { serviceId } = useParams();
	const [serviceDetail, setServiceDetail] = useState(null);
	const location = useLocation();

	const [reviews, setReviews] = useState([]);

	const [loginActionNeeded, setLoginActionNeeded] = useState(false);

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

	function addReviewAuthConfirmHandler() {
		if (!auth) {
			checkTokenValidation().then((isOk) => {
				if (!isOk) {
					setLoginActionNeeded(true);
				}
			});
		} else {
			setOpenAddReviewModal(true);
		}
	}

	function handleAddNewReview(review) {
		setReviews([review, ...reviews]);
	}

	return (
		<div className="pb-10 pt-4">
			<h1 className="section-title">Service Details</h1>

			<AddReviewModal
				onAddReview={handleAddNewReview}
				serviceId={serviceId}
				onCloseModal={handleCloseAddReviewModal}
				isOpen={openAddReviewModal}
				contentSpaceY={300}
				modalClass="!top-40"
			/>

			<Modal
				isOpen={loginActionNeeded}
				modalClass="!top-40"
				onCloseModal={() => {
					setLoginActionNeeded(false);
				}}
			>
				<div>
					<div className="p-2 flex flex-col justify-center items-center">
						<h1 className="text-lg text-center font-semibold mb-2">Please Login To Add Review</h1>
						<Link to="/login" state={{ from: location.pathname }}>
							<Button className="btn-primary">Login</Button>
						</Link>
					</div>
				</div>
			</Modal>

			{serviceDetail ? (
				<div>
					<section className="section">
						<div className="container">
							<div className="block md:grid grid-cols-12">
								<div className="col-span-8">
									<img src={serviceDetail.image} className="w-full" alt="" />
								</div>
								<div className="col-span-4 ml-0 mt-6 md:ml-4 md:mt-0">
									<h1 className="text-xl font-medium">{serviceDetail.title}</h1>
									<p className="font-medium mt-2">Price ${serviceDetail.price}</p>
									<p className="mt-4">{serviceDetail.description}</p>
								</div>
							</div>
						</div>
					</section>

					<section className="section">
						<div className="container">
							<h1 className="section-title text-center py-10">Customer Reviews</h1>

							{reviews.length === 0 && (
								<div>
									<h1 className="text-xl font-semibold text-center">There are No Review</h1>
								</div>
							)}

							<div className="flex justify-center">
								<Button onClick={addReviewAuthConfirmHandler} className="btn-primary">
									Add Review
								</Button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
								{reviews.map((review) => (
									<Review review={review} isDisableAction={true} />
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

