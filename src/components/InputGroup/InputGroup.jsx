import React, { useEffect, useState } from "react";
import validator from "../../utils/validator.js";

const InputGroup = ({ name, as="", type="text", validation, defaultValue, label, onChange, inputClass="", placeholder }) => {
	const [state, setState] = useState({
		value: "",
		errorMessage: "",
	});

	useEffect(() => {
		setState({
			value: defaultValue,
			errorMessage: "",
		});
	}, []);

	function handleChange(e) {
		if (validation) {
			let validate = validator(validation,  e.target.value)
			setState((p) => ({
				...p,
				errorMessage: validate,
				value: e.target.value,
			}));
		}

		onChange(name, e.target.value);
	}

	return (
		<div className="flex flex-col mt-4">
			{label && (
				<label className="cursor-pointer " htmlFor={name}>
					{label}
				</label>
			)}
			{ as === "textarea" ? (
				<textarea
					id={name}
					name={name}
					onChange={handleChange}
					value={defaultValue}
					className={`border border-dark-10/50 px-3 hover:border-green-600 focus:border-green-600 rounded-md py-1.5 outline-none ${inputClass}`}
					placeholder={placeholder}
				/>
			) : (
			<input
				id={name}
				name={name}
				onChange={handleChange}
				value={defaultValue}
				className="border border-dark-10/50 px-3 hover:border-green-600 focus:border-green-600 rounded-md py-1.5 outline-none"
				placeholder={placeholder}
				type={type}
			/>
			) }
			{state.errorMessage && <div className="text-red-400 text-sm mt-1">{state.errorMessage}</div>}
		</div>
	);
};
;

export default InputGroup;
