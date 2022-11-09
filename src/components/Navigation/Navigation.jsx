import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./styles.css";
import {FaBars, FaSignInAlt} from "react-icons/fa";
import usePageScroll from "../../hooks/usePageScroll.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import Avatar from "../Avatar/Avatar.jsx";
import { logOutHandler } from "../../firebase/authHandler.js";

const Navigation = () => {
	const {
		state: { auth },
		actions: { setAuth }
	} = useContext(AppContext);
	const location = useLocation();

	const windowScroll = usePageScroll();
	const [isHomePage, setHomePage] = useState(true);
	const [openAuthMenu, setOpenAuthMenu] = useState(false);
	const [expandNavigation, setExpandNavigation] = useState(false);
	const header = useRef();

	function toggleNavigation() {
		setExpandNavigation(!expandNavigation);
	}

	function handleResize() {
		let h = header.current?.offsetHeight || 0;
		document.documentElement.style.setProperty("--header-height", h + "px");
	}
	
	// window resize event for set header height
	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
 
	useEffect(() => {
		setHomePage(window.location.pathname === "/");
		handleResize();
	}, [location.pathname]);
	
	async function handleLogOut() {
		let isDone = await logOutHandler()
		// console.log(isDone)
		// if(isDone){
		// 	setAuth(null, true)
		// }
		
		
		setAuth(null, true)
		
		
	}
	
	return (
		<div>
			<div
				className={`navbar w-full top-0 left-0 fixed shadow-md z-40 ${
					windowScroll < 100 && isHomePage ? "shadow-none navbar-transparent" : "bg-white"
				}`}
			>
				<div ref={header} className="container flex justify-between">
					<div className="flex">
						<Link to="/" className="flex items-center">
							<img src="/logo2.png" alt="" className="w-40" />
						</Link>
					</div>

					<div>
						<div className={`flex items-center`}>
							<div
								className={`flex items-center justify-center main-nav gap-x-5 ${
									expandNavigation ? "expand" : ""
								}`}
							>
								<NavLink
									end={true}
									onClick={() => setExpandNavigation(false)}
									to="/"
									className="py-4 nav-item"
								>
									Home
								</NavLink>
								<NavLink onClick={() => setExpandNavigation(false)} to="/services" className=" nav-item">
									Services
								</NavLink>
								<NavLink onClick={() => setExpandNavigation(false)} to="/blogs" className="nav-item">
									Blogs
								</NavLink>
								{auth && (
									<>
										<NavLink
											onClick={() => setExpandNavigation(false)}
											to="/my-reviews"
											className="nav-item"
										>
											My reviews
										</NavLink>
										<NavLink
											onClick={() => setExpandNavigation(false)}
											to="/add-service"
											className="nav-item"
										>
											Add service
										</NavLink>
									</>
								)}
							</div>

							{auth ? (
								<div
									className="relative "
									onMouseOver={() => setOpenAuthMenu(true)}
									onMouseLeave={() => setOpenAuthMenu(false)}
								>
									<label tabIndex={0} className="">
										<div className="py-3">
											<div className="ml-4">
												<Avatar className="w-9" src={auth.photoURL} username={auth.displayName} />
											</div>
										</div>
									</label>
									<ul className={`dropdown ${
											openAuthMenu ? "dropdown-open" : ""
										}`}
									>
										<div className="flex items-center gap-x-2 p-3">
											<Avatar className="w-6" src={auth.photoURL} username={auth.displayName} />
											<span>{auth.displayName}</span>
										</div>
										
										<li className="pt-1 dropdown-item">
											<Link to="/add-service">
												<span className="text-dark-700">Add Service</span>
											</Link>
										</li>
										<li className="pt-1 dropdown-item">
											<Link to="/my-reviews">
												<span className="text-dark-700">My Reviews</span>
											</Link>
										</li>

										<li className="pt-1 link cursor-pointer dropdown-item" onClick={handleLogOut}>
											Logout
										</li>
									</ul>
								</div>
							) : (
								<NavLink to="/login" className="flex items-center ml-4 py-4">
									<FaSignInAlt />
									<span className="ml-1">Login</span>
								</NavLink>
							)}

							<div className="flex items-center">
								<div className="pl-4">
									<FaBars
										className="text-2xl block text-dark-500 block sm:hidden"
										onClick={toggleNavigation}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{!isHomePage && <div className="header-height" />}
		</div>
	);
};

export default Navigation;
