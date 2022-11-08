import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import App from "../App.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.jsx";
import ServicesPage from "../pages/ServicesPage/ServicesPage.jsx";
import AddServicePage from "../pages/Auth/AddServicePage/AddServicePage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ServiceDetailPage from "../pages/ServiceDetailPage/ServiceDetailPage.jsx";
import MyReviews from "../pages/Auth/MyReviews/MyReviews.jsx";
import Blogs from "../pages/Blogs/Blogs.jsx";

const Routes = () => {
	let router = createBrowserRouter([
		{
			path: "/",
			element: <App />,
			children: [
				{ path: "/", element: <HomePage /> },
				{ path: "/services", element: <ServicesPage /> },
				{ path: "/my-reviews", element: <PrivateRoute> <MyReviews /> </PrivateRoute> },
				{ path: "/service/:serviceId", element: <ServiceDetailPage /> },
				{ path: "/add-service", element: <PrivateRoute> <AddServicePage /> </PrivateRoute> },
				{ path: "/login", element: <LoginPage /> },
				{ path: "/blogs", element: <Blogs /> },
				{ path: "/registration", element: <RegistrationPage /> },
			],
		},
	]);
	return <RouterProvider router={router} fallbackElement={<h1>Loader</h1>} />;
};
export default Routes;