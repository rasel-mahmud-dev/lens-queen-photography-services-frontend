import Loader from "components/Loader/Loader";
import Rating from "components/Rating/Rating";
import React, { useEffect, useState } from "react";
import { api } from "src/axios/axios";
import { Autoplay, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials = () => {
	const [testimonials, setTestimonials] = useState(null);

	useEffect(() => {
		api
			.get("/api/testimonials")
			.then(({ data, status }) => {
				if (status === 200) {
					setTestimonials(data);
				}
			})
			.catch((ex) => {
				setTestimonials([])
			});
	}, []);

	return (
		<div>
			<section className="section ">
				<h1 className="section-title">What Customers Are Saying About Me</h1>
				
				{testimonials && <div className="">
					<Swiper
						slidesPerView={1}
						centeredSlides={false}
						breakpoints={{
							640: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 2,
							},
						}}
						autoplay={{
							delay: 1500,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
						}}
						modules={[Autoplay, Pagination]}
					>
						{testimonials.map((item) => (
							<SwiperSlide key={item._id} className="pb-8">
								<div className="card  !shadow-light overflow-hidden px-4 pb-6 pt-4 m-4">
									<div className="w-16 mx-auto">
										<img className="w-full" src={item.image} alt="" />
									</div>
									<h4 className="text-center italic text-sm font-medium mt-2 mb-1 ">{item.name}</h4>
									<Rating className="justify-center" rate={5} label={false} />
									<p className="whitespace-pre-line text-center text-dark-100 mt-3">{item.text}</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div> }
				
				{ !testimonials && (
					<div><Loader title="Testimonials are fetching" className="flex justify-center my-10"/></div>
				)}
				
			</section>
		</div>
	);
};

export default Testimonials;