import React, {useEffect, useRef, useState} from "react";
import validator from "../../utils/validator.js";

const ImagePicker = ({name, validation, defaultValue, label, onChange, placeholder}) => {
	const [state, setState] = useState({
		value: "",
		errorMessage: "",
		base64: "",
	});
	
	const input = useRef();
	
	useEffect(() => {
		setState({
			value: defaultValue,
			errorMessage: "",
		});
	}, []);
	
	function handleChange(e) {
		let file = e.target.files[0];
		let validate = "";
		if (validation) {
			validate = validator(validation, file);
		}
		
		let reader = new FileReader();
		reader.onload = (evt) => {
			setState((p) => ({
				...p,
				base64: evt.target.result,
			}));
		};
		reader.readAsDataURL(file);
		
		setState((p) => ({
			...p,
			errorMessage: validate,
			value: file,
		}));
		
		onChange(name, file);
	}
	
	function chooseImage() {
		input.current.click();
	}
	
	return (
		<div className="flex flex-col mt-4">
			{label && (
				<label className="cursor-pointer font-medium text-dark-500 " htmlFor={name}>
					{label}
				</label>
			)}
			
			<div
				onClick={chooseImage}
				className="border border-dark-10/50 px-3 hover:border-green-600 focus:border-green-600 rounded-md py-1.5 outline-none"
			>
				<span className="text-dark-50/80">{placeholder}</span>
				<input
					ref={input}
					id={name}
					name={name}
					onChange={handleChange}
					hidden={true}
					className=""
					placeholder={placeholder}
					type="file"
					accept="image/png,image/jpeg,image/jpg,image/svg"
				/>
			</div>
			
			{state.errorMessage &&
				<div className="text-red-400 text-sm mt-1">{state.errorMessage}</div>}
			
			{state.base64 ? (
				<img src={state.base64} className="w-full mt-2" alt=""/>
			) : (
				defaultValue && <img src={defaultValue} className="w-full mt-2" alt=""/>
			)}
		</div>
	);
};

export default ImagePicker;
