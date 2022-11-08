/**
 * use this function for input validation
 * @param validate  it can be must object. this object have  required, minLength properties and value should be either string or object that has message and value field
 * @param value it can be string that is input field value
 * @returns {string}
 */
function validator(validate, value){
	let errorMessage = ""
	if("required" in validate){
		if(value === "") errorMessage = validate["required"]
	}
	if ("minLength" in validate){
		if(validate?.minLength) {
			console.log(value.length)
			if (value && (value.length < validate.minLength.value)) errorMessage = validate["minLength"].message
		}
	}
	
	return errorMessage
}

export default validator