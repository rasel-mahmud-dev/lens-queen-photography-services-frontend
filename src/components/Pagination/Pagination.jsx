import React, {useEffect, useState} from "react";
import "./style.css";
import {BiChevronLeft, BiChevronRight} from "react-icons/all";

const Pagination = ({perPage, totalItem, pageNumber, onChange}) => {
	
	const [currentPage, setCurrentPage] = useState(1);
	
	useEffect(()=>{
		setCurrentPage(pageNumber)
	}, [])
	
	let totalPaginateItem = Math.ceil(totalItem / perPage)
	
	function handleChangePageNumber(page, direction) {
		let updatePageNumber = currentPage;
		
		if (direction === 1) {
			if (currentPage === totalPaginateItem) {
				updatePageNumber = 1;
			} else {
				updatePageNumber++;
			}
		} else if (direction === -1) {
			if (currentPage === 1) {
				updatePageNumber = perPage;
			} else {
				updatePageNumber--;
			}
		} else {
			updatePageNumber = page
		}
		setCurrentPage(updatePageNumber);
		onChange && onChange(updatePageNumber)
	}
	

	return totalPaginateItem > 1 && (
		<div className="flex justify-center gap-2 flex-wrap">
			<div className="paginate-item"
			     onClick={() => handleChangePageNumber(currentPage - 1, -1)}>
				<BiChevronLeft className="text-xl"/>
			</div>
			{ new Array(totalPaginateItem).fill(0).map((_, index) => (
				<div
					onClick={() => handleChangePageNumber(index + 1)}
					className={`paginate-item ${currentPage === index + 1 ? "paginate-active" : ""}`}
				>
					{index + 1}
				</div>
			))}
			<div className="paginate-item">
				<BiChevronRight
					onClick={() => handleChangePageNumber(currentPage + 1, 1)}
					className="text-xl"
				/>
			</div>
		</div>
	);
};

export default Pagination;