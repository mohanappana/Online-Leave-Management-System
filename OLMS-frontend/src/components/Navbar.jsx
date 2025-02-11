import React, { useState } from 'react'
import hd from '../assets/email.png'
import { Link } from 'react-router-dom'
import { CgClose, CgMenu } from 'react-icons/cg';
import study from '../assets/hodpage/study.png';
import { useRecoilValue } from 'recoil';
import { roleState } from './atom';
import axiosInstance from './axiosInstance';
import user from '../assets/avatar.png';
import UserProfile from './UserProfile';




const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const role = useRecoilValue(roleState);
    console.log(role,"rolllleeee");
    const NavbarMenu = [
        {
            id:1,
            title:"Home",
            link:"/"
        },
        {
            id:2,
            title:"About Us",
            link:"/aboutUs"
        },
        {
            id:3,
            title:"Contact US",
            link:"/contactUs"
        },
        

    ];

    const [toggleMenu, setToggleMenu] = useState(false);

    const handleLogout = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await axiosInstance.post('/logout',{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.error("Logout failed",error)
        }).finally(() => {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = '/';
        })

    }
  return (
    <div className=' bg-blue-950 text-gray-200 w-full  '>
        <div className='md:flex items-center justify-between py-2 px-7 md:px-10 '>
            {/* LogoSection */}
            <div className='flex items-center gap-2'>
                <img className='w-14' src={hd} alt="" />
                <p className='text-2xl font-bold '><span className='text-blue-400'>O</span>LMS</p>
            </div>
            {/* menubaritems */}
            <div onClick={() => setToggleMenu(!toggleMenu)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                {toggleMenu? <CgClose/> :<CgMenu/>}
            </div>
            <div className='flex gap-3'> 
                
                <ul  className={`md:flex md:items-center pb-12 md:pb-0 md:static absolute left-0 p pl-9 md:pl-0 w-full md:w-auto bg-blue-950 transition-all duration-50 ease-in ${
                    toggleMenu? 'top-20 opacity-100 bg-blue-950 z-10': 'top-[-400px] md:opacity-100 opacity-0'
                } `}>
                
                        {NavbarMenu.map((item) => (
                            <li key={item.id} className='md:ml-8 my-7 md:my-0'>
                                <Link className='hover:text-green-600 duration-500' to={item.link}>{item.title}</Link>
                            </li>
                        ))}
                        {
                            (role !=="")?
                            // <button className='w-14' onClick={handleLogout}>
                            //     Log out
                            // </button>
                            <div className='bg-[#37be46] p-2 rounded-full cursor-pointer'>
                                <img src={user} className='w-6' onClick={openModal}/>
                            </div>
                            :<div>
                                
                            </div>
                        }
                </ul>
                
            </div>
            

      </div>
      {showModal && < UserProfile show={showModal} onRequestClose={closeModal} isOpen={showModal}/>}
    </div>
  )
}

export default Navbar
