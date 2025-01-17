'use client'
import { Button, CircleProgress, CircleProgressLine, CircleProgressText, Modal, ModalAction, ModalContent, ModalDescription, ModalHeader, ModalTitle } from 'keep-react'
import useAuth from "@/Hook/useAuth";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hook/useAxiosPublic";
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Payment/CheckoutForm';
import { BiSolidDonateHeart } from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';
import DonationCard from '@/Components/DonationsCampaigns/DonationCard';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_CLIENT_SECRET);

const DonationDetails = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const location = useLocation()

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch donation details by ID
    const { data: donation = {}, isLoading, refetch } = useQuery({
        queryKey: ["donationDetails", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/donation-details/${id}`);
            return data;
        },
    });

    // Fetch suggested donation campaigns
    const { data: suggestedDonation = [], isLoading: isLoadingSuggested } = useQuery({
        queryKey: ["suggestionDonationCampaign"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/suggestion-donation-campaign");
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

    if (isLoading && isLoadingSuggested) return (
        <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-8 my-16">
            <div className="flex-1">
                <Skeleton height={400} />
            </div>

            <div className="flex-1 space-y-4">
                <Skeleton height={30} width="60%" />
                <Skeleton height={20} width="40%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="50%" />
                <Skeleton height={20} width="60%" />
                <Skeleton height={30} width="80%" />
                <Skeleton height={100} />
            </div>
        </div>
    );

    return (
        <section>
            {/* Banner Section */}
            <div className="relative flex items-center h-[30vh] bg-cover bg-center"
                style={{ backgroundImage: `url(https://img.freepik.com/premium-photo/silhouette-dog-looking-away-field-against-sky_1048944-17766562.jpg?w=740` }}></div>

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
                            })}</p>
                            <p>
                                <strong>Status:</strong> <span className={`${donation?.status === 'Running' && 'text-green-600'} ${donation?.status === 'Pause' && 'text-red-600'} ${donation?.status === 'Complete' && 'text-blue-600 font-semibold'}`}>
                                    {donation?.status}
                                </span>
                            </p>
                        </div>
                        <div>
                            <CircleProgress progress={(donation?.totalDonateAmount / donation?.maxAmount) * 100 || 0}>
                                <CircleProgressLine className="text-error-500" strokeColor="text-error-500" />
                                <CircleProgressText>
                                    {Math.round((donation?.totalDonateAmount / donation?.maxAmount) * 100 || 0)}%
                                </CircleProgressText>
                            </CircleProgress>
                        </div>
                    </div>

                    <p><strong>Description:</strong> {donation?.shortDescription}</p>

                    <Elements stripe={stripePromise}>
                        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <ModalAction asChild>
                                <Button
                                    disabled={donation?.status === 'Pause' || donation?.maxAmount === donation?.totalDonateAmount}
                                    onClick={handleDonateNowClick}
                                    className="bg-color-accent hover:bg-color-accent disabled:cursor-not-allowed">
                                    Donate Now
                                </Button>
                            </ModalAction>

                            <ModalContent className="max-w-[20rem] lg:max-w-[26rem]">
                                <ModalHeader className="mb-6 flex flex-col justify-center space-y-3">
                                    <div className='flex items-center justify-center flex-col gap-1'>
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-metal-100 bg-metal-50 text-metal-600 dark:border-metal-800 dark:bg-metal-800 dark:text-white">
                                            <BiSolidDonateHeart size={50} />
                                        </div>
                                        <ModalTitle>Donate Now</ModalTitle>
                                    </div>
                                    <div className="space-y-1 text-center">
                                        <ModalDescription>
                                            <CheckoutForm
                                                donationId={donation?._id}
                                                donationName={donation?.donationName}
                                                donationImage={donation?.donationImage}
                                                maxAmount={donation?.maxAmount}
                                                totalDonateAmount={donation?.totalDonateAmount}
                                                refetch={refetch}
                                                setIsModalOpen={setIsModalOpen}
                                            />
                                        </ModalDescription>
                                    </div>
                                </ModalHeader>
                            </ModalContent>
                        </Modal>
                    </Elements>
                </div>
            </div>

            <div className="w-11/12 mx-auto my-20">
                <h3 className="text-2xl text-color-accent-d font-semibold border-b-2 border-color-accent inline">Details More</h3>
                <div
                    className="donation-description leading-relaxed mt-8"
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
            </div>

            <div className='w-11/12 mx-auto mb-20'>
                <h3 className="text-2xl text-color-accent-d font-semibold border-b-2 border-color-accent inline">Suggestion</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {isLoadingSuggested ? (
                        Array(3).fill().map((_, index) => (
                            <div key={index} className="p-4">
                                <Skeleton height={200} />
                                <Skeleton height={20} width="80%" className="mt-2" />
                                <Skeleton height={20} width="60%" className="mt-2" />
                            </div>
                        ))
                    ) : (
                        suggestedDonation?.map((donation) => (
                            <DonationCard key={donation?._id} donation={donation} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default DonationDetails;