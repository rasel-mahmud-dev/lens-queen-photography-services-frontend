import React from "react";
import { FaFacebookF, FaGithub, FaInstagram, FaYoutube } from "react-icons/all.js";

const Social = (props) => {
	return (
		<div {...props}>
			<ul className="flex gap-4 mt-4">
				<a
					className="hover:bg-primary-600 rounded-full text-gray-50 hover:text-white w-11 h-11 md:w-8 md:h-8 flex justify-center items-center border dark:border-neutral border-dark-5/60  rounded-box"
					href="https://www.facebook.com/rasel-mahmud-dev"
				>
					<FaFacebookF className="text-2xl md:text-sm" />
				</a>
				<a
					className="hover:bg-primary-600 rounded-full text-gray-50 hover:text-white w-11 h-11 md:w-8 md:h-8 flex justify-center items-center border dark:border-neutral border-dark-5/60  rounded-box"
					href="https://github.com/rasel-mahmud-dev"
					target="_blank"
				>
					<FaGithub className="text-2xl md:text-sm" />
				</a>{" "}
				<a
					className="hover:bg-primary-600 rounded-full text-gray-50 hover:text-white w-11 h-11 md:w-8 md:h-8 flex justify-center items-center border dark:border-neutral border-dark-5/60  rounded-box"
					href="/"
				>
					<FaYoutube className="text-xl md:text-sm" />
				</a>
				<a
					className="hover:bg-primary-600 rounded-full text-gray-50 hover:text-white w-11 h-11 md:w-8 md:h-8 flex justify-center items-center border dark:border-neutral border-dark-5/60  rounded-box"
					href="https://www.instagram.com/raselmraju"
					target="_blank"
				>
					<FaInstagram className="text-2xl md:text-sm" />
				</a>
			</ul>
		</div>
	);
};

export default Social;