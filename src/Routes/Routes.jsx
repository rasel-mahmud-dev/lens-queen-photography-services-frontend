import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import App from "../App.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.jsx";

const Routes = () => {
	let router = createBrowserRouter([
		{
			path: "/",
			element: <App />,
			children: [
				{ path: "/", element: <HomePage /> },
				{ path: "/login", element: <LoginPage /> },
				{ path: "/registration", element: <RegistrationPage /> },
			],
		},
	]);
	return <RouterProvider router={router} fallbackElement={<h1>Loader</h1>} />;
};
export default Routes;