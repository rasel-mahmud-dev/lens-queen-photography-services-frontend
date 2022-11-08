import React from 'react';
import {ScaleLoader} from "react-spinners"

const Loader = ({className="", loaderOptions}) => {
	return (
		<div className={className}>
			<ScaleLoader {...loaderOptions} />
  </div>
	);
};

export default Loader;