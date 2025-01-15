import PropTypes from "prop-types";
import { FaGetPocket } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAddReaction } from "react-icons/md";
import { Link } from "react-router-dom";

const PetCard = ({ pet = {} }) => {
    console.log(pet);
    const { _id, petImage, petName, petAge, petLocation } = pet

    return (
        <div>
            <Link href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                <img
                    alt=""
                    src={petImage}
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-3">
                    <dl>
                        <div>
                            <dd className="font-medium">{petName}</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <FaGetPocket size={14} />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Age</p>

                                <p className="font-medium"> {petAge?.value} {petAge?.unit}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <FaLocationDot size={14} />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Location</p>

                                <p className="font-medium">{petLocation?.length < 10 ? petLocation : `${petLocation?.slice(0, 7)}...`}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <MdAddReaction size={14} />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Action</p>

                                <Link to={`/pet-details/${_id}`} className="font-medium underline">Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

PetCard.propTypes = {
    pet: PropTypes.object.isRequired,
}

export default PetCard;