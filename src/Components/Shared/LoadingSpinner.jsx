import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <ScaleLoader
                height={60}
                margin={2}
                width={5}
                color='#F04335'
            />
        </div>
    );
};

export default LoadingSpinner;