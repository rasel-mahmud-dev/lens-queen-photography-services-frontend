import HomePage from "pages/HomePage/HomePage";
import React from "react";
import App from "src/App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ExcludeAuthRoute from "src/Routes/ExcludeAuthRoute";
import PrivateRoute from "src/Routes/PrivateRoute";
import NotFoundPage from "components/NotFoundPage/NotFoundPage";
import AddServicePage from "pages/Auth/AddServicePage/AddServicePage";
import MyReviews from "pages/Auth/MyReviews/MyReviews";
import Blogs from "pages/Blogs/Blogs";
import LoginPage from "pages/LoginPage/LoginPage";
import RegistrationPage from "pages/RegistrationPage/RegistrationPage";
import ServiceDetailPage from "pages/ServiceDetailPage/ServiceDetailPage";
import ServicesPage from "pages/ServicesPage/ServicesPage";


const Routes = () => {
	let router = createBrowserRouter([
		{
			path: "/",
			element: <App />,
			errorElement: <NotFoundPage />,
			children: [
				{ path: "/", element: <HomePage /> },
				{ path: "/services", element: <ServicesPage /> },
				{ path: "/my-reviews", element: <PrivateRoute> <MyReviews /> </PrivateRoute> },
				{ path: "/service/:serviceId", element: <ServiceDetailPage />} ,
				{ path: "/add-service", element: <PrivateRoute> <AddServicePage /> </PrivateRoute> },
				{ path: "/update-service/:serviceId", element: <PrivateRoute> <AddServicePage /> </PrivateRoute> },
				{ path: "/login", element: <ExcludeAuthRoute><LoginPage /></ExcludeAuthRoute> },
				{ path: "/blogs", element: <Blogs /> },
				{ path: "/registration", element: <ExcludeAuthRoute> <RegistrationPage /> </ExcludeAuthRoute> },
			],
		},
	]);
	return <RouterProvider router={router} fallbackElement={<h1>Loader</h1>} />;
};
export default Routes;