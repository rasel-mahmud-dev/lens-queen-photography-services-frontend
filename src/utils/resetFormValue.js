function resetFormValue(formData){
	let updatedFormData = {...formData}
	for (let updatedFormDataKey in updatedFormData) {
		updatedFormData[updatedFormDataKey] = {
			...updatedFormData[updatedFormDataKey],
			value: ""
		}
	}
	return updatedFormData
}
export default  resetFormValue