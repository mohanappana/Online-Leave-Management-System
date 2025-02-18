import React, { useState } from 'react';
import hd from '../assets/email.png';
import { Link } from 'react-router-dom';
import { CgClose, CgMenu } from 'react-icons/cg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileState, roleState } from './atom';
import axiosInstance from './axiosInstance';
import user from '../assets/avatar.png';
import UserProfile from './UserProfile';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const role = useRecoilValue(roleState);
  const [showProfile, setShowProfile] = useRecoilState(profileState); // Recoil state for profile visibility

  const NavbarMenu = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "About", link: "" },
    { id: 3, title: "Contact Us", link: "" }
  ];

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axiosInstance.post('/logout', {
        headers: { Authorization: `Bearer ${token}` }
      });

      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-blue-950 text-gray-200 w-full relative">
      <div className="md:flex items-center justify-between py-2 px-7 md:px-10">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img className="w-14" src={hd} alt="Logo" />
          <p className="text-2xl font-bold">
            <span className="text-blue-400">O</span>LMS
          </p>
        </div>

        {/* Menu Toggle Button (for Mobile) */}
        <div onClick={() => setToggleMenu(!toggleMenu)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
          {toggleMenu ? <CgClose /> : <CgMenu />}
        </div>

        {/* Menu Items */}
        <div>
          <ul className={`md:flex gap-3 md:items-center pb-12 md:pb-0 md:static absolute left-0 pl-9 md:pl-0 w-full md:w-auto bg-blue-950 transition-all duration-300 ease-in ${toggleMenu ? 'top-20 opacity-100 bg-blue-950 z-10' : 'top-[-400px] md:opacity-100 opacity-0'}`}>
            {NavbarMenu.map((item) => (
              <li key={item.id} className="md:ml-5 my-7 md:my-0">
                <Link 
                  className={`hover:text-green-600 duration-500 text-lg ${item.link === "" ? 'cursor-auto' : ''}`}
                  to={item.link || "#"}
                  onClick={(e) => { if (item.link === "") e.preventDefault(); }}
                >
                  {item.title}
                </Link>
              </li>
            ))}

            {/* User Profile Button (Only if Role is Present) */}
            {role !== "" && (
              <div className="sm:ml-6">
                <div 
                  className="bg-[#37be46] p-2 rounded-full w-10 cursor-pointer"
                  onClick={() => setShowProfile(!showProfile)} // Toggle profile visibility
                >
                  <img src={user} className="w-6" alt="User" />
                </div>
                {/* User Profile Component (Only shown when showProfile is true) */}
                {showProfile && <UserProfile />}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
