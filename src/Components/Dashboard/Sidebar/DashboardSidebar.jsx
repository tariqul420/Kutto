'use client'
import { FolderSimplePlus, MagnifyingGlass, UserCircleGear } from 'phosphor-react';
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
    Input,
    InputIcon,
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarItem,
    SidebarList,
} from 'keep-react';
import { Bird, HandHeart, ListPlus, PawPrint, PiggyBank, Users, Wrench } from 'lucide-react';
import { PiTipJar } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';

export const DashboardSidebar = () => {
    return (
        <Sidebar className="max-h-[100vh] h-full m-2 overflow-auto">
            <SidebarBody>
                <div href="/" className="inline-flex items-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-metal-900 text-heading-6 font-semibold text-white dark:bg-metal-800">
                        K.
                    </span>
                </div>

                <fieldset className="relative">
                    <Input placeholder="Search" className="ps-11" />
                    <InputIcon>
                        <MagnifyingGlass size={19} color="#AFBACA" />
                    </InputIcon>
                </fieldset>

                <SidebarList className="space-y-0.5 dashboard">
                    <NavLink
                        to="/dashboard/all-users"
                    >
                        <SidebarItem>
                            <Users size={20} />
                            All Users
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/all-pets"
                    >
                        <SidebarItem>
                            <PawPrint size={20} />
                            All Pets
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/all-donations"
                    >
                        <SidebarItem>
                            <HandHeart size={20} />
                            All Donations
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/add-pet"
                    >
                        <SidebarItem>
                            <ListPlus size={20} />
                            Add Pet
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-added-pets"
                    >
                        <SidebarItem>
                            <Bird size={20} />
                            My Added Pets
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/adoption-request"
                    >
                        <SidebarItem>
                            <Wrench size={20} />
                            Adoption Request
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/create-donation"
                    >
                        <SidebarItem>
                            <FolderSimplePlus size={20} />
                            Create Donation
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-donation-campaign"
                    >
                        <SidebarItem>
                            <PiTipJar size={20} />
                            My Donation
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-donate"
                    >
                        <SidebarItem>
                            <PiggyBank size={20} />
                            My Donate
                        </SidebarItem>
                    </NavLink>
                    <NavLink
                        to="/dashboard/settings"
                    >
                        <SidebarItem>
                            <UserCircleGear size={20} />
                            Settings
                        </SidebarItem>
                    </NavLink>
                </SidebarList>
            </SidebarBody>

            <SidebarFooter>
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="/images/avatar/avatar-1.png" alt="avatar" />
                        <AvatarFallback>KR</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-body-4 font-medium text-metal-400">Enzo Farnandez</p>
                        <p className="text-body-4 font-normal text-metal-300">enzo123@gmail.com</p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};
