import { Swiper, SwiperSlide } from 'swiper/react';
import { ImQuotesLeft } from 'react-icons/im';

const reviewData = [
    {
        name: "John Doe",
        image: "https://img.freepik.com/free-photo/portrait-young-man-posing_23-2148884296.jpg?t=st=1736862363~exp=1736865963~hmac=a1b69c587c3250ed5cf0f2ef30efa19d0e57655f7715980c247902a9d75dab77&w=360",
        testimonial: "Adopting a pet from this platform was the best decision ever! It was simple, fast, and a life-changing experience."
    },
    {
        name: "Jane Smith",
        image: "https://img.freepik.com/premium-photo/dramatic-portrait-millennial-black-knitted-hat-sweater-dark-background_157945-955.jpg?w=360",
        testimonial: "The platform is user-friendly, and I felt supported throughout the adoption process. I now have a new family member!"
    },
    {
        name: "Mark Johnson",
        image: "https://img.freepik.com/free-photo/close-up-portrait-young-hindu-man-isolated-real-emotions-male-model-mourning-mental-suffering-facial-expression-human-nature-emotions-concept_155003-23513.jpg?t=st=1736862441~exp=1736866041~hmac=0f538cba79dbc5b7ff56a666c55e6b245c8134ff87ab05d73caf16f23ebaa578&w=740",
        testimonial: "A smooth adoption experience. The platform provided all the details I needed and matched me with the perfect pet!"
    },
    {
        name: "Sarah Lee",
        image: "https://img.freepik.com/free-photo/young-lady-with-deep-green-eyes-long-brown-hair_8353-1307.jpg?t=st=1736862489~exp=1736866089~hmac=2559345326715b249aa9d696bc639fb12246d6f83b8136fba2cbbbe5b3d5f278&w=740",
        testimonial: "The team is fantastic! They helped me adopt the perfect pet, and the entire process was easy and transparent."
    }
];

const Testimonials = () => {
    return (
        <section className="w-full py-16">
            <div className="w-11/12 mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Our Happy Customers
                </h2>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {reviewData.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex items-center bg-white dark:bg-dark-lite shadow-lg rounded-lg p-6">
                                <div className="w-1/3 mr-6">
                                    <img
                                        src={review.image}
                                        alt={`Customer ${review.name}`}
                                        className="w-44 h-44 rounded-full object-cover"
                                    />
                                </div>
                                <div className="w-2/3">
                                    <div className="flex items-center mb-2">
                                        <ImQuotesLeft className="text-6xl text-color-accent mr-2" />
                                        <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                            {review.name}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {review.testimonial}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
