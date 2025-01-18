import PropTypes from "prop-types";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdAddReaction } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const DonationCard = ({ donation = {}, isRefetchSuggested }) => {
    const { _id, donationImage, donationName, maxAmount, totalDonateAmount } = donation
    const navigate = useNavigate()
    const location = useLocation()

    const handelNavigateRefetch = () => {
        navigate(`/donation-details/${_id}`)

        if (location.pathname.startsWith('/donation-details')) {
            isRefetchSuggested()
        }
    };

    return (
        <div
            onClick={handelNavigateRefetch}
            className="block rounded-lg p-4 shadow-sm shadow-indigo-100 cursor-pointer">
            <img
                alt=""
                src={donationImage}
                className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-3">
                <dl>
                    <div>
                        <dd className="font-medium">{donationName}</dd>
                    </div>
                </dl>

                <div className="mt-6 flex items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <AiFillDollarCircle size={14} />

                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Max Amount</p>

                            <p className="font-medium"> $ {maxAmount}</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <FaLocationDot size={14} />

                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Donated Amount</p>

                            <p className="font-medium">
                                $ {totalDonateAmount}
                            </p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <MdAddReaction size={14} />

                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Action</p>

                            <button
                                onClick={handelNavigateRefetch}
                                className="font-medium underline cursor-pointer">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DonationCard.propTypes = {
    donation: PropTypes.object.isRequired,
    isRefetchSuggested: PropTypes.func,
}

export default DonationCard;