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
			
			<div className="flex gap-4  flex-wrap justify-center">
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

			<div className="flex justify-center flex-col md:flex-row gap-10 max-w-4xl mx-auto  border-t pt-10 mt-12">
				<div className="text-center">
					<h1 className="">
						<div className="text-primary-600  text-4xl font-bold">417+</div>
						<div className="text-dark-400 text-md font-bold uppercase mt-2">Project Done</div>
					</h1>
					<p className="para mt-1">
						I completed successfully more than 417 projects. Each project i try my best.
					</p>
				</div>

				<div className="text-center">
					<h1 className="">
						<div className="text-primary-600 text-4xl font-bold">347+</div>
						<div className="text-dark-400 text-md font-bold  mt-2">HAPPY CLIENT</div>
					</h1>
					<p className="para">
						In my passed 3 years services almost 347+ peoples are satisfied
					</p>
				</div>
			</div>
		</section>
	);
};

export default MyWorkSection;