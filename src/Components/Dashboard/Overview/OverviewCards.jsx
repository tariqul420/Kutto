import useRole from "@/Hook/useRole";
import PropTypes from "prop-types";
import { BiDonateHeart } from "react-icons/bi";
import { FaHandHoldingUsd, FaHandsHelping } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { MdOutlinePets } from "react-icons/md";
import { PiDog } from "react-icons/pi";

const OverviewCards = ({ overview }) => {
    const [role] = useRole()

    const overviewData = [
        ...(role === 'admin' ? [
            {
                title: "Total Users",
                icon: <LuUsers size={24} />,
                data: overview?.allUser,
                color: '#4a90e2'
            },
            {
                title: "Total Pets",
                icon: <PiDog size={24} />,
                data: overview?.allPet,
                color: '#f5a623'
            },
            {
                title: "Total Donation Amount",
                icon: <FaHandHoldingUsd size={24} />,
                data: overview?.totalDonation?.[0]?.totalAmount,
                color: '#7ED321'
            },
            {
                title: "Total Donators",
                icon: <BiDonateHeart size={24} />,
                data: overview?.allDonator,
                color: '#FF5733'
            }
        ] : []),

        {
            title: "My Pets",
            icon: <MdOutlinePets size={24} />,
            data: overview?.myPet,
            color: '#D0021B'
        },
        {
            title: "Adoption Requests",
            icon: <FaHandsHelping size={24} />,
            data: overview?.adoptionRequest,
            color: '#B8E986'
        },
        {
            title: "My Donation Campaigns",
            icon: <BiDonateHeart size={24} />,
            data: overview?.donationCampaign,
            color: '#F39C12'
        },
        {
            title: "My Donated Amount",
            icon: <FaHandHoldingUsd size={24} />,
            data: overview?.myDonate?.[0]?.totalAmount,
            color: '#9013FE'
        },

        ...(role === 'admin' ? [
            {
                title: "",
                icon: '',
                data: '',
                color: ''
            }
        ] : [
            {
                title: "",
                icon: '',
                data: '',
                color: ''
            },
            {
                title: "",
                icon: '',
                data: '',
                color: ''
            }
        ]),
    ];

    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mb-6`}>
            {
                overviewData?.map((cardInfo, index) => (
                    <div key={index} className="dark:bg-dark-lite bg-white flex justify-between p-4 rounded-md shadow-md">
                        <div className="space-y-2">
                            <p>{cardInfo?.title}</p>
                            <p className="text-2xl font-bold">{cardInfo?.data}</p>
                        </div>
                        <div className="">
                            <span
                                className="flex items-center justify-center w-10 h-10 p-1 rounded-full text-white"
                                style={{ backgroundColor: cardInfo?.color }}
                            >
                                {cardInfo?.icon}
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

OverviewCards.propTypes = {
    overview: PropTypes.object.isRequired,
}

export default OverviewCards;