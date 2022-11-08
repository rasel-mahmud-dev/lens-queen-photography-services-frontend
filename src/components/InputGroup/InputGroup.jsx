import React, { useEffect, useState } from "react";
import validator from "../../utils/validator.js";

const InputGroup = ({ name, validation, defaultValue, label, onChange, placeholder }) => {
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
			<input
				id={name}
				name={name}
				onChange={handleChange}
				value={defaultValue}
				className="border border-dark-10/50 px-3 hover:border-green-600 focus:border-green-600 rounded-md py-1.5 outline-none"
				placeholder={placeholder}
				type="text"
			/>
			{state.errorMessage && <div className="text-red-400 text-sm mt-1">{state.errorMessage}</div>}
		</div>
	);
};
;

export default InputGroup;
