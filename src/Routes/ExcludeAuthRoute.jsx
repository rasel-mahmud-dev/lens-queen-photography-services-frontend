import React, { useContext } from "react";
import Loader from "components/Loader/Loader";
import {Navigate} from "react-router-dom";
import {AppContext} from "src/context/AppContext";


// logged user not access these routes
const ExcludeAuthRoute = (props) => {
	const { state } = useContext(AppContext);
	
	if (!state.isAuthLoaded) {
		return <Loader loaderOptions={{color: "green"}} className="relative flex justify-center top-40"/>
	}
	
	if (state.auth) {
		return <Navigate to="/" replace={true} />;
	}
	
	return props.children;
};

export default ExcludeAuthRoute;
