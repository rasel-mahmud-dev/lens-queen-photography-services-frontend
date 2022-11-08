import React from "react";

const Divider = ({text, className="", color= "bg-dark-10"}) => {
	return (
			<div className={`divider justify-center items-center flex gap-2 ${className}`}>
				<span className={`h-px w-full inline-block ${color}`}></span>
				<span className="text-center">{text}</span>
				<span className={`h-px  w-full inline-block ${color}`}></span>
			</div>
	);
};

export default Divider;