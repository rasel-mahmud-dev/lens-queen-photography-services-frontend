import React from "react";
import Button from "../Button/Button.jsx";
import {BsGoogle} from "react-icons/bs";

const SocialLogin = () => {
	return (
		<div>
			<div className="">
				<Button
					type="button"
					className="bg-red-400 justify-center items-center flex w-full px-4 py-2 border-none !text-white font-semibold text-sm rounded-md"
				>
					<span className="flex items-center">
						<BsGoogle className="mr-2 text-md"/>
						Login With Google
					</span>
				</Button>
			</div>
		</div>
	);
};

export default SocialLogin;