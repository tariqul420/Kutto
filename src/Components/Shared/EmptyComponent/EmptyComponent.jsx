import { buttonVariants, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react';
import { Link, useLocation } from 'react-router-dom';

const EmptyComponent = () => {
    const location = useLocation();

    return (
        <Empty className={`col-span-3 ${location.pathname.startsWith('/pets') && 'mb-6'}`}>
            <EmptyImage>
                <img
                    src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
                    height={234}
                    width={350}
                    alt="No results illustration"
                />
            </EmptyImage>
            <EmptyTitle className="mb-[14px] mt-5">Sorry, No result found!</EmptyTitle>
            <EmptyDescription className="mb-8">
                We couldn’t find any results for your search. Please try adjusting your search criteria or check back later.
            </EmptyDescription>

            {location.pathname.startsWith('/pets') && (
                <Link to="/" className={buttonVariants({ color: 'primary' })}>
                    Go to home
                </Link>
            )}
        </Empty>
    );
};

export default EmptyComponent;