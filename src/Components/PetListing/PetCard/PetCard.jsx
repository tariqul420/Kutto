import { FaGetPocket } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAddReaction } from "react-icons/md";
import { Link } from "react-router-dom";

const PetCard = () => {
    return (
        <div>
            <Link href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-3">
                    <dl>
                        <div>
                            <dt className="sr-only">Address</dt>

                            <dd className="font-medium">123 Wallaby Avenue, Park Road</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <FaGetPocket size={14} />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Age</p>

                                <p className="font-medium"> 10 Years</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <FaLocationDot size={14} />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Location</p>

                                <p className="font-medium">Bangladesh</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <MdAddReaction size={14} />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Action</p>

                                <Link className="font-medium underline">Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PetCard;