import { Link } from "react-router-dom";

const AuthBtn = () => {
    return (
        <div className="flex gap-4">
            <Link to='/register'>
                <button className="bg-color-accent px-4 py-2 text-lg font-medium rounded-md text-white max-sm:hidden">
                    Register
                </button>
            </Link>
            <Link to='/login'>
                <button className="bg-color-accent px-4 py-2 text-lg font-medium rounded-md text-white">
                    Login
                </button>
            </Link>
        </div>
    );
};

export default AuthBtn;