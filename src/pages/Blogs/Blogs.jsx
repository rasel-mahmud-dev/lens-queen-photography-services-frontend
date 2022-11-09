import React from "react";
import SEO from "../../components/SEO/SEO.jsx";

const Blogs = () => {
	const blogs = [
		{
			id: 1,
			title: "What is Difference between SQL and NoSQL Database ?",
			description: `
			
			`,
		},
		{
			id: 2,
			title: "What is JWT, and how does it work?",
			description: ``,
		},
		{
			id: 3,
			title: "What is the difference between javascript and NodeJS ?",
			description: ``,
		},{
			id: 4,
			title: "How does NodeJS handle multiple requests at the same time?",
			description: ``,
		},
	];
	
	return (
		<div className="max-w-screen-md mx-auto ">
			<SEO title="Blog Page in lens queen " />
            <h1 className="text-3xl font-semibold text-center mt-12">Blogs</h1>
            <div className="px-4">
                {blogs.map((blog) => (
	                <div className="shadow-light bg-white p-4 my-10 rounded-lg">
                        <h1 className="text-xl font-semibold text-neutral-800">{blog.title}</h1>
                        <p className="mt-3 text-neutral-500 whitespace-pre-line">{blog.description}</p>
                    </div>
                ))}
            </div>
        </div>
	);
};

export default Blogs;
