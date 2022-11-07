import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import App from "../App.jsx";
import Login from "../pages/Login/Login.jsx";

const Routes = () => {
	let router = createBrowserRouter([
		{ path: "/", element: <App />, children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/login", element: <Login /> }
			] },
	]);
	return <RouterProvider router={router} fallbackElement={<h1>Loader</h1>} />;
};
export default Routes