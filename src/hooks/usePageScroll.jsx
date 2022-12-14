import React, {useEffect, useState} from 'react';

const UsePageScroll = () => {
	const [scrollHeight, setScrollHeight] = useState(window.scrollY)
	
	useEffect(()=>{
		window.addEventListener("scroll", handleScroll)
		return ()=> window.removeEventListener("scroll", handleScroll)
	}, [])
	
	
	function handleScroll(){
		setScrollHeight(window.scrollY)
	}
	
	
	return scrollHeight
};

export default UsePageScroll;
