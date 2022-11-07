import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import "./styles.css";
import {FaSignInAlt} from "react-icons/fa";
import {HiBars4} from "react-icons/hi2";
import usePageScroll from "../../hooks/usePageScroll.jsx";

const Navigation = () => {
	const auth = null;
	
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
				<div ref={header} className="container flex justify-between py-4">
					<div className="flex">
						<Link to="/" className="">
							<img src="/logo.png" alt="" className="w-40"/>
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
								>
								Home
							</NavLink>
							<NavLink
								onClick={() => setExpandNavigation(false)}
								to="/services"
								className=""
							>
								Services
							</NavLink>
							<NavLink
								onClick={() => setExpandNavigation(false)}
								to="/blogs"
								className=""
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
										<div className=" ">
											<div
												className="rounded-full w-9">
												{auth.photoURL ? (
													<img src={auth.photoURL} alt="avatar"/>
												) : (
													<span>{auth.displayName}</span>
												)}
											</div>
										</div>
									</label>
									<ul
										tabIndex={0}
										className={`absolute opacity-0 z-50 invisible top-8 -right-3 mt-3 p-4 bg-dark-10 shadow-around rounded-box w-52 ${
											openAuthMenu ? "!opacity-100 !visible" : ""
										}`}
									>
										<li className="pt-1">{auth.displayName}</li>
										<li className="pt-1">
											<Link to={`/profile/${auth.uId}`}>Profile</Link>
										</li>
										<li className="pt-1 link cursor-pointer">Logout</li>
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
