import React from "react";
import { BsStarFill } from "react-icons/all";

const Rating = ({ rate }) => {
	return (
		<div className="flex items-center gap-x-px">
			{Array(5)
				.fill(1)
				.map((_, index) => (
					<BsStarFill
						key={index}
						className={`text-dark-50/50 cursor-pointer ${
							rate >= index + 1 ? "!text-orange-400" : ""
						}`}
					/>
				))}
		</div>
	);
};

export default Rating;