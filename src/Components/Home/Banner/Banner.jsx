'use client'
import autoPlay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselButtons,
    CarouselControl,
    CarouselIndicators,
    CarouselItem,
    CarouselNextButton,
    CarouselPrevButton,
    CarouselSlides,
} from 'keep-react'

export const Banner = () => {
    const carouselData = [
        {
            img: "https://images.unsplash.com/photo-1498336179775-9836baef8fdf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Beautiful landscape"
        },
        {
            img: "https://plus.unsplash.com/premium_photo-1675437553489-0ddf979f299a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Premium mountain view"
        },
        {
            img: "https://plus.unsplash.com/premium_photo-1723601193263-6b022f5c8eb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3V0ZSUyMGRvZ3MlMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3D",
            alt: "Cute dogs banner"
        },
        {
            img: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3V0ZSUyMHJhYml0JTIwYmFubmVyfGVufDB8fDB8fHww",
            alt: "Rabbits playing in a field"
        },
        {
            img: "https://images.unsplash.com/photo-1466354424719-343280fe118b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGN1dGUlMjBmaXNoJTIwYmFubmVyfGVufDB8fDB8fHww",
            alt: "Colorful fish in water"
        },
    ]

    return (
        <Carousel className='w-11/12 mx-auto my-8' options={{ loop: true }} plugins={[autoPlay()]} aria-label="Image Carousel">
            <CarouselSlides>
                {carouselData.map((slide, index) => (
                    <CarouselItem key={index}>
                        <div
                            className="relative flex items-center rounded-xl h-[26rem] bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            {/* Overlay for better text visibility */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

                            {/* Content */}
                            <div className="relative w-11/12 mx-auto text-center text-white z-10 space-y-4">
                                <h1 className="font-bold text-5xl mb-4">
                                    Best Friend
                                    <span className="relative inline-block mx-2 text-white">
                                        <span className="absolute inset-0 bg-color-accent clip-trapezoid"></span>
                                        <span className="relative px-4 py-1">With</span>
                                    </span>
                                    <br /> Happy Time
                                </h1>

                                <p className="text-lg">
                                    Human shampoo for dogs after six days of delicate care.
                                    Ensure your pet’s <br /> happiness with quality grooming products.
                                </p>
                                <button className='bg-color-accent p-3 px-4 text-lg font-medium'>View More</button>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselSlides>
            <CarouselControl>
                <CarouselButtons>
                    <CarouselPrevButton />
                    <CarouselNextButton />
                </CarouselButtons>
                <CarouselIndicators />
            </CarouselControl>
        </Carousel>
    )
}