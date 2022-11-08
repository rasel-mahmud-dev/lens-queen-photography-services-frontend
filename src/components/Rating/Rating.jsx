import React from 'react';
import {BiStar, BsStarFill} from "react-icons/all";

const Rating = ({rate}) => {
	return (
		<div className="flex items-center gap-x-px">
			{ Array(rate).fill(1).map(_=>(
				<BsStarFill  className="text-orange-400"/>
			)) }
	
  </div>
	);
};

export default Rating;