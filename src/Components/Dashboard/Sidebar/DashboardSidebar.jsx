'use client'
import useAuth from '@/Hook/useAuth';
import useRole from '@/Hook/useRole';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarItem,
    SidebarList
} from 'keep-react';
import { Bird, HandHeart, ListPlus, PawPrint, PiggyBank, Users, Wrench, XCircle } from 'lucide-react';
import { FolderSimplePlus } from 'phosphor-react';
import PropTypes from 'prop-types';
import { MdPets } from 'react-icons/md';
import { PiTipJar } from 'react-icons/pi';
import { Link, NavLink } from 'react-router-dom';

const DashboardSidebar = ({ setDashboardOpen }) => {
    const { user } = useAuth();
    const [role] = useRole();

    const handleLinkClick = () => {
        setDashboardOpen(false);
    };

    return (
        <Sidebar className="mt-2 max-h-[100vh] h-full overflow-auto w-full">
            <SidebarBody className='sidebar-scrollable'>
                <div className='flex justify-between'>
                    <Link to={'/'}>
                        <div className="flex items-center">
                            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-metal-900 text-heading-6 font-semibold text-white dark:bg-metal-800">
                                <MdPets />
                            </span>
                            <span className='ml-2 text-xl'>Kutto</span>
                        </div>
                    </Link>
                    <div
                        onClick={handleLinkClick}
                        className='md:hidden'>
                        <XCircle size={24} />
                    </div>
                </div>

                <SidebarList className="space-y-0.5 dashboard">
                    {
                        role === 'admin' && (
                            <>
                                <NavLink to="/dashboard/all-users" onClick={handleLinkClick}>
                                    <SidebarItem>
                                        <Users size={20} />
                                        All Users
                                    </SidebarItem>
                                </NavLink>
                                <NavLink to="/dashboard/all-pets" onClick={handleLinkClick}>
                                    <SidebarItem>
                                        <PawPrint size={20} />
                                        All Pets
                                    </SidebarItem>
                                </NavLink>
                                <NavLink to="/dashboard/all-donations" onClick={handleLinkClick}>
                                    <SidebarItem>
                                        <HandHeart size={20} />
                                        All Donations
                                    </SidebarItem>
                                </NavLink>
                            </>
                        )
                    }
                    <NavLink to="/dashboard/add-pet" onClick={handleLinkClick}>
                        <SidebarItem>
                            <ListPlus size={20} />
                            Add Pet
                        </SidebarItem>
                    </NavLink>
                    <NavLink to="/dashboard/my-added-pets" onClick={handleLinkClick}>
                        <SidebarItem>
                            <Bird size={20} />
                            My Added Pets
                        </SidebarItem>
                    </NavLink>
                    <NavLink to="/dashboard/adoption-request" onClick={handleLinkClick}>
                        <SidebarItem>
                            <Wrench size={20} />
                            Adoption Request
                        </SidebarItem>
                    </NavLink>
                    <NavLink to="/dashboard/create-donation" onClick={handleLinkClick}>
                        <SidebarItem>
                            <FolderSimplePlus size={20} />
                            Create Donation
                        </SidebarItem>
                    </NavLink>
                    <NavLink to="/dashboard/my-donation-campaign" onClick={handleLinkClick}>
                        <SidebarItem>
                            <PiTipJar size={20} />
                            My Donation
                        </SidebarItem>
                    </NavLink>
                    <NavLink to="/dashboard/my-donate" onClick={handleLinkClick}>
                        <SidebarItem>
                            <PiggyBank size={20} />
                            My Donate
                        </SidebarItem>
                    </NavLink>
                </SidebarList>
            </SidebarBody>

            <SidebarFooter>
                <div className="flex items-center gap-2">
                    <Avatar>
                        {user?.photoURL ? (
                            <AvatarImage
                                referrerPolicy="no-referrer"
                                src={user.photoURL}
                                alt="avatar"
                                className='object-cover'
                            />
                        ) : (
                            <AvatarFallback>
                                {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : "NA"}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        <p className="text-body-4 font-medium text-metal-400">
                            {user?.displayName?.length < 14
                                ? user.displayName
                                : user.displayName.substring(0, 11) + '...'}
                        </p>
                        <p className="text-body-4 font-normal text-metal-300">
                            {user?.email?.length < 17
                                ? user.email
                                : user.email.substring(0, 14) + '...'}</p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

DashboardSidebar.propTypes = {
    setDashboardOpen: PropTypes.func.isRequired,
};

export default DashboardSidebar