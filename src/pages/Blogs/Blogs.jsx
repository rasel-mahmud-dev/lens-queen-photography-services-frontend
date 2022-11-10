import Loader from "components/Loader/Loader";
import React, { useEffect, useState } from "react";
import { api } from "src/axios/axios";
import SEO from "../../components/SEO/SEO.jsx";

const Blogs = () => {
	const [blogData, setBlogData] = useState([]);

	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		api
			.get("/api/blogs")
			.then(({ data, status }) => {
				if (status === 200) {
					setBlogData(data);
				}
				setLoading(false);
			})
			.catch((ex) => {
				setLoading(false);
			});
	}, []);

	return (
		<div className="max-w-screen-md mx-auto ">
			<SEO title="Blog Page in lens queen " />
			<h1 className="text-3xl font-semibold text-center mt-12">Blogs</h1>

			{!isLoading ? (
				<div className="px-4">
					{blogData?.map((blog) => (
						<div className="shadow-light bg-white p-4 my-10 rounded-lg">
							<h1 className="text-xl font-semibold text-neutral-800">{blog.title}</h1>
							<p className="mt-3 text-neutral-500 whitespace-pre-line">{blog.description}</p>
						</div>
					))}
				</div>
			) : (
				<div className="pb-20">
					<Loader title="Blogs data Loading" className="flex justify-center mt-32" />
				</div>
			)}
		</div>
	);
};

export default Blogs;
