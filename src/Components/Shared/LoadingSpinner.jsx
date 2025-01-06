import Lottie from 'lottie-react';
import loading from '../../assets/Lottie/loading.json'

const LoadingSpinner = () => {
    return (
        <div className='flex items-center justify-center gap-4'>
            <Lottie animationData={loading} />
            <p className='text-5xl font-bold text-[#5D68F8]'>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;