import React from "react";

const Avatar = ({ className = "", src }) => {
	return (
		<div className={className}>
			<img src={src} alt="avatar" className="rounded-full w-full" />
		</div>
	);
};

export default Avatar;