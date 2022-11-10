import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import Pagination from "components/Pagination/Pagination";
import SEO from "components/SEO/SEO";
import Service from "components/Service/Service";
import React, { useContext, useEffect, useState } from "react";
import { BsPlusSquareDotted } from "react-icons/all";
import { Link } from "react-router-dom";
import {
	checkTokenValidation,
	deleteServiceAction,
	fetchServicesAction,
	fetchServicesCountAction,
} from "src/context/actions/serviceAction";
import { AppContext } from "src/context/AppContext";
import useToast from "src/hooks/useToast";
import catchErrorMessage from "src/utils/catchErrorMessage";

const ServicesPage = () => {
	const {
		state: { auth, services },
		actions: { setServices },
	} = useContext(AppContext);

	const [toast] = useToast();

	const [isLoadService, setLoadService] = useState("");

	const [pagination, setPagination] = useState({
		pageNumber: 1,
		perPage: 6,
		totalServices: 0,
	});

	function changePageNumber(pageNumber) {
		setPagination((prev) => ({ ...prev, pageNumber: pageNumber }));
	}

	function handleChangePerPage(e) {
		setPagination((prev) => ({ ...prev, pageNumber: 1, perPage: Number(e.target.value) }));
	}

	useEffect(() => {
		
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
		
		setLoadService("loading");
		fetchServicesCountAction()
			.then((total) => {
				setPagination((prev) => ({ ...prev, totalServices: total }));
				setLoadService("");
			})
			.catch((ex) => {
				setLoadService("Service fetch fail");
			});
	}, []);

	// filter with paginate service from database and store context state
	useEffect(() => {
		if (pagination.totalServices) {
			setLoadService("loading");
			fetchServicesAction({ pagination: pagination })
				.then((data) => {
					setServices(data);
					setLoadService("");

					/// for mobile device smooth scroll to top
					scrollTo({
						behavior: "smooth",
						top: 0,
					});
				})
				.catch((ex) => {
					setServices([]);
					let msg = catchErrorMessage(ex);
					setLoadService(msg);
					toast.error(msg);
				});
		}
	}, [pagination]);

	// update service from database and context state
	async function handleDeleteService(serviceId) {
		try {
			if (!auth) return toast.error("To delete service you have to login");
			let isValid = await checkTokenValidation();
			if (!isValid) return toast.error("Your token is not valid, please login again");

			let deleted = await deleteServiceAction(serviceId);
			if (deleted) {
				toast.error("Service has been deleted");
				setServices(services.filter((service) => service._id !== serviceId));
			}
		} catch (ex) {
			toast.error(catchErrorMessage(ex));
		}
	}

	return (
		<div className="container my-4">
			<SEO title="Services Page in lens queen " />

			<div className="flex flex-col md:flex-row  justify-between items-center">
				<h1 className="text-2xl font-semibold text-center md:text-left mb-10 md:mb-0">
					Services
					<span className="text-dark-500 ml-2">({pagination.totalServices})</span>
				</h1>
				<div className="flex items-center justify-between w-full md:w-auto">
					<div className="mr-5">
						<label htmlFor="per-page" className="per-page-label">
							View Items
						</label>
						<select
							className="input-select"
							id="per-page"
							onChange={handleChangePerPage}
							defaultValue={pagination.perPage}
						>
							{new Array(10).fill(0).map((_, index) => (
								<option key={index} value={index + 1}>
									{index + 1}
								</option>
							))}
						</select>
					</div>

					<Link to="/add-service" className="">
						<Button className="btn-primary flex items-center gap-x-2 ">
							<BsPlusSquareDotted className="text-white" />
							Add Service
						</Button>
					</Link>
				</div>
			</div>

			{/**** if loading completed and services are empty array then no service message */}
			{isLoadService === "" && services && services.length === 0 && (
				<h1 className="text-2xl text-center mt-20 font-medium">No services Found</h1>
			)}

			{/**** if isLoadService equal not loading and not empty string then show http error message  */}
			{isLoadService !== "loading" && isLoadService !== "" && (
				<h1 className="text-2xl text-center mt-20 font-medium">{isLoadService}</h1>
			)}

			{/**** if isLoadService empty string then show services else show loading  */}
			{isLoadService === "" && services ? (
				<div>
					<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 mt-10 gap-6">
						{services.map((item) => (
							<Service
								isDisableAction={!auth}
								onDelete={handleDeleteService}
								key={item._id}
								{...item}
							/>
						))}
					</div>
				</div>
			) : (
				isLoadService === "loading" && (
					<div>
						<Loader title="Loading services" className="flex justify-center mt-32" />
					</div>
				)
			)}

			<div className="mt-10">
				<Pagination
					perPage={pagination.perPage}
					pageNumber={pagination.pageNumber}
					totalItem={pagination.totalServices}
					onChange={changePageNumber}
				/>
			</div>
		</div>
	);
};

export default ServicesPage;
