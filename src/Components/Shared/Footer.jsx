import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { Link, useLocation } from "react-router-dom"

const Footer = () => {
    const location = useLocation()

    return (
        <div className={`${location.pathname.startsWith('/dashboard') ? 'hidden' : ''} pt-4 w-full bg-gray-100 dark:bg-dark-lite`}>
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-8">
                <div className="space-y-4">
                    <h2 className="font-extrabold text-2xl flex gap-2 items-center">
                        <span>Kutto</span>
                        <span className="text-color-accent">
                            <MdOutlinePets />
                        </span></h2>
                    <p className="font-medium text-xl">Subscribe</p>
                    <div>
                        <p className="font-medium mb-2">Get 10% off your order</p>
                        <div className='w-full relative'>
                            <input
                                type='email'
                                placeholder='Enter Your Email'
                                className='border bg-color-text border-solid outline-none placeholder:text-white/80 border-white py-3 pl-4 pr-[50px]  w-full rounded-md' />

                            <span className='absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer text-white'>
                                <IoSend />
                            </span>
                        </div>
                    </div>

                </div>

                <div className="space-y-4">
                    <h2 className="font-semibold text-2xl">Support</h2>
                    <p>Notabaria, Chatmohor, Pabna, Bangladesh</p>
                    <p>tariqul.developer@gmail.com</p>
                    <p>+8801743892058</p>
                </div>
                <div className="space-y-4">
                    <h2 className="font-semibold text-2xl">Support</h2>
                    <p><Link to='/'>Home</Link></p>
                    <p><Link to={'/login'}>Login</Link>/<Link to={'/register'}>Register</Link></p>
                    <p><Link to={'/pet-listing'}>Pet Listing</Link></p>
                    <p><Link to={'/donation-campaigns'}>Donation Campaigns</Link></p>
                </div>
                <div className="space-y-4">
                    <h2 className="font-semibold text-2xl">Quick Link</h2>
                    <p>Privacy Policy</p>
                    <p>Terms Of Use</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                </div>
                <div className="space-y-4">
                    <h2 className="font-semibold text-2xl">Download App</h2>
                    <div className="flex gap-4">
                        <div>
                            <img className="w-full h-full" src="https://i.postimg.cc/7h3hyqZC/download.png" alt="" />
                        </div>
                        <div>
                            <img className="w-full h-full" src="https://i.postimg.cc/0js5nh09/play-apple.png" alt="" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                        <a target="_blank" href="https://www.facebook.com/tariqul.islam.fb">
                            <FaFacebookF size={25} />
                        </a>
                        <a target="_blank" href="https://github.com/tariqul420">
                            <FaGithub size={25} />
                        </a>
                        <a target="_blank" href="https://www.instagram.com/tariqul.islam.fb">
                            <FaInstagram size={25} />
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/">
                            <FaLinkedinIn size={25} />
                        </a>
                    </div>
                </div>
            </div>
            <p className="dark:text-white/70 text-center py-4 border-t border-solid border-color-text dark:border-white">&copy; Copyright Kutto {new Date().getFullYear()}. All Right Reserved</p>
        </div>
    );
};

export default Footer;
