import Loader from "components/Loader/Loader";
import React, {useEffect, useState} from "react";
import {api} from "src/axios/axios";

const MyWorkSection = () => {
	const [projects, setProjects] = useState(null);
	
	useEffect(() => {
		api
			.get("/api/projects")
			.then(({ data, status }) => {
				if (status === 200) {
					setProjects(data);
				}
			})
			.catch((ex) => {
				setProjects([]);
			});
	}, []);

	
	return (
		<section className="section">
			<h1 className="section-title">My Work Information</h1>
			
			{/***** More About us *******/}
			
			<div className="flex gap-4  flex-wrap justify-center mt-10">
				{projects && projects.map((project) => (
					<div className="my-project-img-root my-4" key={project._id}>
						<img className="w-full" src={project.image} alt=""/>
						<h4 className="text-center font-medium text-sm text-dark-500 my-2">{project.type}</h4>
					</div>
				))}
			</div>
			
			{ !projects && (
				<div><Loader title="Project are fetching" className="flex justify-center my-10"/></div>
			)}

			<div className="flex justify-center max-w-4xl mx-auto  border-t pt-10 mt-12">
				<div className="text-center">
					<h1 className="">
						<div className="text-primary-600  text-4xl font-bold">417+</div>
						<div className="text-dark-500 text-lg font-medium"> Project Done</div>
					</h1>
					<p className="para">
						Urna purus netus ut aptent inceptos faucibus turpis tincidunt amet justo viverra
					</p>
				</div>

				<div className="text-center">
					<h1>
						<div className="text-primary-600  text-4xl font-bold">147+</div>
						<div className="text-dark-500 text-lg font-medium">HAPPY CLIENT</div>
					</h1>
					<p className="para">
						Urna purus netus ut aptent inceptos faucibus turpis tincidunt amet justo viverra
					</p>
				</div>
			</div>
		</section>
	);
};

export default MyWorkSection;