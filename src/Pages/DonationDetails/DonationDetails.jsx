'use client'
import { Button, CircleProgress, CircleProgressLine, CircleProgressText, Modal, ModalAction, ModalContent, ModalHeader, ModalTitle } from 'keep-react'
import useAuth from "@/Hook/useAuth";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hook/useAxiosPublic";
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';
import { useState } from 'react';
import LoadingSpinner from '@/Components/Shared/LoadingSpinner';

const DonationDetails = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const location = useLocation()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: donation = {}, isLoading } = useQuery({
        queryKey: ["donationDetails", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/donation-details/${id}`);
            return data;
        },
    });

    const handleDonateNowClick = () => {
        if (user) {
            setIsModalOpen(true);
        } else {
            toast.error("You need to log in to adopt a donation!");
            navigate('/login', { state: { from: location.pathname }, replace: true });
        }
    };

    const sanitizedDescription = DOMPurify.sanitize(donation?.longDescription);

    if (isLoading) return <LoadingSpinner />

    return (
        <section>
            {/* Banner Section */}
            <div className="relative flex items-center h-[30vh] bg-cover bg-center"
                style={{ backgroundImage: `url(https://img.freepik.com/premium-photo/silhouette-dog-looking-away-field-against-sky_1048944-17766562.jpg?w=740` }}>
                <div className="relative w-11/12 text-center text-white z-10">
                    <h1 className="font-bold text-5xl">
                        Donation
                        <span className="relative inline-block mx-2 text-white">
                            <span className="absolute inset-0 bg-color-accent clip-trapezoid"></span>
                            <span className="relative px-4 py-1">Details</span>
                        </span>
                    </h1>
                </div>
            </div>

            {/* donation Details Section */}
            <div className="donation-details w-11/12 mx-auto flex flex-col lg:flex-row gap-8 my-16">
                <div className="flex-1">
                    <img
                        src={donation?.donationImage}
                        alt={donation?.donationName}
                        className="w-full h-[400px] object-cover rounded-md"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <div className='flex items-center justify-between'>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{donation.donationName}</h2>
                            <p><strong>maxAmount:</strong> $ {donation?.maxAmount}</p>
                            <p><strong>Donated Amount:</strong> $ {donation?.totalDonateAmount}</p>
                            <p><strong>Last Date:</strong> {new Date(donation?.lastDate).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                            </p>
                            <p>
                                <strong>Status:</strong> <span className={`${donation?.status === 'Running' && 'text-green-600'} ${donation?.status === 'Pause' && 'text-red-600'}`}>
                                    {donation?.status}
                                </span>
                            </p>
                        </div>
                        <div>
                            <CircleProgress progress={(donation?.totalDonateAmount / donation?.maxAmount) * 100 || 0}>
                                <CircleProgressLine className="text-error-500" strokeColor="text-error-500"
                                />
                                <CircleProgressText>
                                    {Math.round((donation?.totalDonateAmount / donation?.maxAmount) * 100 || 0)}%
                                </CircleProgressText>
                            </CircleProgress>
                        </div>
                    </div>

                    <p><strong>Description:</strong> {donation?.shortDescription}</p>

                    <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <ModalAction asChild>
                            <Button
                                disabled={donation?.status === 'Pause' || donation?.maxAmount === donation?.totalDonateAmount}
                                onClick={handleDonateNowClick}
                                className="bg-color-accent hover:bg-color-accent disabled:cursor-not-allowed">
                                Donate Now
                            </Button>
                        </ModalAction>

                        <ModalContent>
                            <ModalHeader className="mb-6 flex flex-col justify-center">
                                <div className="space-y-1 text-center">
                                    <ModalTitle className='mb-4'>{donation?.donationName}</ModalTitle>
                                    <div>
                                        Hello Developer. How Are Your?
                                    </div>
                                </div>
                            </ModalHeader>
                        </ModalContent>
                    </Modal>
                </div>
            </div>

            <div className="w-11/12 mx-auto my-20">
                <p className="text-2xl text-color-accent-d font-semibold border-b-2 border-color-accent inline">Details More</p>
                <div
                    className="donation-description text-base md:text-lg leading-relaxed mt-8"
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
            </div>
        </section>
    );
};

export default DonationDetails;