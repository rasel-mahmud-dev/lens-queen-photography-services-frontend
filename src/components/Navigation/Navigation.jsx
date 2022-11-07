import { useEffect, useState } from "react";
import { Button, IconButton, MobileNav, Navbar, Typography } from "@material-tailwind/react";

function Navigation() {
	const [openNav, setOpenNav] = useState(false);

	useEffect(() => {
		window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
	}, []);

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
				<a href="#" className="flex items-center">
					Services
				</a>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
				<a href="#" className="flex items-center">
					Blogs
				</a>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
				<a href="#" className="flex items-center">
					Login
				</a>
			</Typography>
			<Button variant="gradient" size="sm" className="hidden lg:inline-block">
				<span>Buy Now</span>
			</Button>
		</ul>
	);

	return (
		<Navbar className="mx-auto py-2 px-4 lg:px-8 lg:py-4" fullWidth={true}>
			<div className="container mx-auto  w-full flex items-center justify-between text-blue-gray-900">
				<Typography
					as="a"
					href="#"
					variant="small"
					className="mr-4 cursor-pointer py-1.5 font-normal"
				>
					<div className="flex items-center gap-x-1">
						<img className="w-32" src="/logo.png" alt="" />
					</div>
				</Typography>

				<div>
					<div className="hidden lg:block">{navList}</div>

					<IconButton
						variant="text"
						className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
						ripple={false}
						onClick={() => setOpenNav(!openNav)}
					>
						{openNav ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="h-6 w-6"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</IconButton>
				</div>
			</div>
			<MobileNav open={openNav}>
				{navList}
			</MobileNav>
		</Navbar>
	);
}

export default Navigation;