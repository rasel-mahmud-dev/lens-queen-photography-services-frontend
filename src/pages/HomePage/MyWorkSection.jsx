import React from "react";

const MyWorkSection = () => {
	
	const projects = [
		{ type: "WEDDINGS", image: "/images/images-3dc8c674fe6c4.jpg" },
		{ type: "Nature", image: "/images/images-a11226a5b3172.jpg" },
		{ type: "PEOPLE", image: "/images/images-3dc8c674fe6c4.jpg" },
		{ type: "Nature", image: "/images/images-a11226a5b3172.jpg" },
		{ type: "Nature", image: "/images/images-d7cfb425b2773.jpg" },
		{ type: "Nature", image: "/images/images-f8de2b4d4bf42.jpg" },
		{ type: "Nature", image: "/images/images-ff69d8fcbeb8a.jpg" },
		{ type: "Nature", image: "/images/imagesasd.jpg" },
		{ type: "Nature", image: "/images/images-ff69d8fcbeb8a.jpg" },
	]
	
	
	return (
		<section className="section py-10">
			<h1 className="section-title">My Work Information</h1>

			{/***** More About us *******/}

			<div className="flex gap-4  flex-wrap justify-center mt-10">
				{ projects.map((project)=>(
					<div className="my-project-img-root my-4">
						<img
							className="w-full"
							src={project.image}
							alt=""
						/><h4 className='text-center font-medium text-sm text-dark-500 my-2'>{project.type}</h4>
				</div>
				)) }
			</div>

			<div className="flex justify-center max-w-4xl mx-auto  border-t py-10 mt-12">
				<div className="text-center">
					<h1 className=''>
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