import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import "./styles.css";
import {FaSignInAlt} from "react-icons/fa";
import {HiBars4} from "react-icons/hi2";
import usePageScroll from "../../hooks/usePageScroll.jsx";
import {AppContext} from "../../context/AppContext.jsx";
import Avatar from "../Avatar/Avatar.jsx";

const Navigation = () => {
	const { state: { auth }, actions: { logOutHandler } } = useContext(AppContext);
	const location = useLocation();
	
	const windowScroll = usePageScroll()
	const [isHomePage, setHomePage] = useState(true)
	const [openAuthMenu, setOpenAuthMenu] = useState(false);
	const [expandNavigation, setExpandNavigation] = useState(false);
	const header = useRef()
	
	function toggleNavigation() {
		setExpandNavigation(!expandNavigation);
	}
	
	function handleResize(){
		let h = header.current?.offsetHeight || 0
		document.documentElement.style.setProperty("--header-height", h + "px")
	}
	
	useEffect(()=>{
		handleResize()
		window.addEventListener("resize", handleResize)
		return ()=>window.removeEventListener("resize", handleResize)
	}, [])
	
	
	useEffect(()=>{
		setHomePage(window.location.pathname === "/")
		handleResize()
	}, [location.pathname])
	
	
	return (
		<div>
			<div className={`w-full top-0 left-0 fixed shadow-md z-40 ${(windowScroll < 100 && isHomePage) ? "shadow-none navbar-transparent": "bg-white" }`}>
				<div ref={header} className="container flex justify-between">
					<div className="flex">
						<Link to="/" className="flex items-center">
							<img src="/logo2.png" alt="" className="w-40"/>
						</Link>
					</div>

					<div>
						<div
							className={`flex items-center`}>
							<div
								className={`flex items-center justify-center main-nav gap-x-4 ${
									expandNavigation ? "expand" : ""
								}`}>
								<NavLink
									end={true}
									onClick={() => setExpandNavigation(false)}
									to="/"
									className="py-4"
								>
								Home
							</NavLink>
							<NavLink
								onClick={() => setExpandNavigation(false)}
								to="/services"
								className="py-4"
							>
								Services
							</NavLink>
							<NavLink
								onClick={() => setExpandNavigation(false)}
								to="/blogs"
								className="py-4"
							>
								Blogs
							</NavLink>
							</div>
							
							{auth ? (
								<div
									className="relative "
									onMouseOver={() => setOpenAuthMenu(true)}
									onMouseLeave={() => setOpenAuthMenu(false)}
								>
									<label tabIndex={0} className="">
										<div className="py-1">
											<div
												className="ml-4">
												<Avatar className='w-9' src={auth.photoURL} username={auth.displayName}  />
											</div>
										</div>
									</label>
									<ul
										tabIndex={0}
										className={`absolute opacity-0 z-50 invisible top-8 -right-3 mt-3 p-4 bg-white shadow-around  rounded-md w-52 text-dark-700 ${
											openAuthMenu ? "!opacity-100 !visible" : ""
										}`}
									>
										<li className="pt-1">{auth.displayName}</li>
										<li className="pt-1">
											<Link to={`/profile/${auth.uId}`}><span className="text-dark-700">My Reviews</span></Link>
										</li>
										<li className="pt-1">
											<Link to={`/profile/${auth.uId}`}><span className="text-dark-700">Add Review</span></Link>
										</li>
										<li className="pt-1 link cursor-pointer" onClick={logOutHandler}>Logout</li>
									</ul>
								</div>
							) : (
								<NavLink to="/login" className="flex items-center ml-4">
									<FaSignInAlt/>
									<span className="ml-1">Login</span>
								</NavLink>
							)}
							
							<div className="flex items-center">
								<div className="pl-4">
									<HiBars4 className="text-2xl block text-dark-500 block sm:hidden"
									         onClick={toggleNavigation}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{ !isHomePage &&  <div className="header-height"/> }
		</div>
	);
};

export default Navigation;
