import React from "react";
import "./style.css";

const Button = ({ className, ...attributes }) => {
	return <button className={`btn border-none font-medium px-4 py-2 rounded-md ${className}`} {...attributes} />;
};

export default Button;
