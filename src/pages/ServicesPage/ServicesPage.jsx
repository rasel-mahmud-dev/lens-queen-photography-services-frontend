import React, {useContext, useEffect, useState} from "react";
import Service from "../../components/Service/Service.jsx";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import {BsPlusSquareDotted} from "react-icons/all.js";
import {fetchServicesAction, fetchServicesCountAction} from "../../context/actions.js";
import SEO from "../../components/SEO/SEO.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import useToast from "../../hooks/useToast.jsx";
import catchErrorMessage from "../../../utills/catchErrorMessage.js";


const ServicesPage = () => {
	const {
		state: { services },
		actions: { setServices },
	} = useContext(AppContext);
	
	const [toast] = useToast()
	
	const [isLoadService, setLoadService] = useState(false)
	
	const [pagination, setPagination] = useState({
		pageNumber: 1,
		perPage: 2,
		totalServices: 0
	})
	
	function changePageNumber(pageNumber){
		setPagination(prev=>({...prev, pageNumber: pageNumber}))
	}
	function handleChangePerPage(e){
		setPagination(prev=>({...prev, perPage: Number(e.target.value)}))
	}
	useEffect(()=>{
		fetchServicesCountAction().then(total=>{
			setPagination(prev=>({...prev, totalServices: total}))
		})
	}, [])
	
	useEffect(()=>{
		if(pagination.totalServices) {
			setLoadService(true)
			fetchServicesAction({pagination: pagination}).then(data => {
				setServices(data)
				setLoadService(false)
			}).catch((ex) => {
				setServices([])
				setLoadService(false)
				toast.error(catchErrorMessage(ex))
			})
		}
	}, [pagination])
	
	return (
		<div className="container my-4">
			
			<SEO title="Services Page in lens queen " />
			
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium">Services</h1>
				<div className="flex items-center">
					<div className="mr-5">
						<label htmlFor="per-page" className="per-page-label">View Items</label>
						<select className="input-select" id="per-page" onChange={handleChangePerPage} defaultValue={pagination.perPage}>
							{new Array(10).fill(0).map((_, index)=>(
								<option value={index + 1}>{index + 1}</option>
							)) }
						</select>
					</div>
					
					<Link to="/add-service" className="">
					<Button className="btn-primary flex items-center gap-x-2 ">
						<BsPlusSquareDotted className="text-white" />
						Add Service</Button>
				</Link>
				
				</div>
			</div>
			
			{(!isLoadService && services.length === 0) && (
				<h1 className="text-2xl text-center mt-20 font-medium">No services Found</h1>
			)}
			
			{ (!isLoadService && services)  ? (
				<div>
				
				<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 mt-10 gap-4">
					{services.map((item) => (
						<Service key={item._id} {...item} />
					))}
				</div>
				</div>
			) : (
				<div><Loader title="Loading services" className="flex justify-center mt-32"/></div>
			)}
			
			<div className="mt-10">
				<Pagination perPage={pagination.perPage} pageNumber={pagination.pageNumber} totalItem={pagination.totalServices} onChange={changePageNumber} />
			</div>
			
		</div>
	);
};

export default ServicesPage;
