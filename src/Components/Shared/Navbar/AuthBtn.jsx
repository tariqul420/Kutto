import { Link } from "react-router-dom";

const AuthBtn = () => {
    return (
        <div className="flex gap-4">
            <Link to='/register'>
                <button className="border-2 px-5 py-2 rounded-full border-solid border-color-accent dark:border-color-accent-d font-semibold text-lg max-sm:hidden">
                    Register
                </button>
            </Link>
            <Link to='/login'>
                <button className="border-2 px-5 py-2 rounded-full border-solid border-color-accent dark:border-color-accent-d font-semibold text-lg bg-color-accent dark:bg-color-accent-d shadow-md hover:text-color-text">
                    Login
                </button>
            </Link>
        </div>
    );
};

export default AuthBtn;