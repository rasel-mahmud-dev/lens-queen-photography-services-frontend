import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import Review from "components/Review/Review";
import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {fetchReviewByServiceIdAction} from "src/context/actions/reviewAction";
import {checkTokenValidation, fetchServiceAction} from "src/context/actions/serviceAction";
import {AppContext} from "src/context/AppContext";

import AddReviewModal from "src/pages/Shared/AddReviewModal/AddReviewModal";

const ServiceDetailPage = () => {
	const {
		state: {auth},
	} = useContext(AppContext);
	
	const {serviceId} = useParams();
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
			.catch((ex) => {
			});
	}, [serviceId]);
	
	// before permit to write review check user token isValid or not
	function addReviewAuthConfirmHandler() {
		if (!auth) {
			checkTokenValidation().then((isOk) => {
				if (!isOk) {
					setLoginActionNeeded(true);
				}
			});
		} else {
			setLoginActionNeeded(false);
			setOpenAddReviewModal(true);
		}
	}
	
	function handleAddNewReview(review) {
		setReviews([review, ...reviews]);
	}
	
	return (
		<div className="container pb-10 pt-4">
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
				<div className="">
					<div className="p-2 flex flex-col justify-center items-center">
						<h1 className="text-lg text-center font-semibold mb-2">Please Login To Add Review</h1>
						<Link to="/login" state={{from: location.pathname}}>
							<Button className="btn-primary">Login</Button>
						</Link>
					</div>
				</div>
			</Modal>
			
			{serviceDetail ? (
				<div className='pt-4'>
					<div>
						<div className="block md:grid grid-cols-12">
							<div className="col-span-7">
								<img src={serviceDetail.image} className="w-full" alt=""/>
							</div>
							<div className="col-span-5 ml-0 mt-6 md:ml-4 md:mt-0">
								<h1 className="text-dark-500 text-3xl font-semibold">{serviceDetail.title}</h1>
								<p className="font-medium mt-2">Price ${serviceDetail.price}</p>
								<p className="mt-4 whitespace-pre-line">{serviceDetail.description}</p>
							</div>
						</div>
					</div>

					<div className="container mt-10 ">
						<h1 className="section-title text-center">Customer Reviews</h1>

						<div className="flex justify-center mb-8">
							<Button onClick={addReviewAuthConfirmHandler} className="btn-primary">
								Add Review
							</Button>
						</div>
						
						{reviews.length === 0 && (
							<div>
								<h1 className="text-xl font-semibold text-center">
									There are no reviews by customers
								</h1>
							</div>
						)}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
							{reviews.map((review) => (
								<Review review={review} isDisableAction={true}/>
							))}
						</div>
					</div>
				</div>
			) : (
				<div>
					<Loader title="Loading Service detail" className="flex justify-center mt-32"/>
				</div>
			)}
		</div>
	);
};

export default ServiceDetailPage;

