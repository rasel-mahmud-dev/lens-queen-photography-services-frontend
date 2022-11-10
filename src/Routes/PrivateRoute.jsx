import Loader from "components/Loader/Loader";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {logOutHandler} from "src/context/actions/authAction";
import {checkTokenValidation} from "src/context/actions/serviceAction";
import {AppContext} from "src/context/AppContext";


const PrivateRoute = (props) => {
	const {
		state: { auth },
		actions: { setAuth },
	} = useContext(AppContext);
	const location = useLocation();

	const [isValidToken, setValidtoken] = useState(false);
	const [isCheckedToken, setCheckedToken] = useState(false);

	useEffect(() => {
		checkTokenValidation().then(async (isValid) => {
			if (isValid) {
				setValidtoken(true);
				setCheckedToken(true);
			} else {
				setValidtoken(false);
				setCheckedToken(true);
				// if token not valid then logged-out user
				let isDone = await logOutHandler();
				if (isDone) {
					setAuth(null, true);
				}
			}
		});
	}, [auth]);

	if (!isCheckedToken) {
		return (
			<Loader loaderOptions={{ color: "green" }} className="relative flex justify-center top-40" />
		);
	}

	if (isCheckedToken && !isValidToken && !auth) {
		return <Navigate to="/login" state={{ from: location.pathname }} />;
	}

	return props.children;
};

export default PrivateRoute;
