import React, { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance'
import { useRecoilValue } from 'recoil'
import { userState } from './atom'
import Modal from "react-modal";
import { FaUserCircle } from 'react-icons/fa';

Modal.setAppElement("#root");
const UserProfile = ({isOpen , onRequestClose}) => {
  

  const userId = useRecoilValue(userState);
     const handleLogout = async() => {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await axiosInstance.post('/auth/logout',{
        headers : {
          Authorization : `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log("logout failed",error);
      }).finally(() => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href ='/';
      })
      
      
     
      
    }
  
  return (
    <div className="relative">
      {/* Profile Button */}
      {/* <button
        onClick={openModal}
        className="flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
      >
        <FaUserCircle className="text-3xl text-gray-600" />
      </button> */}

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="absolute top-14 right-0 w-72 bg-gray-500 shadow-lg rounded-lg p-4 border border-gray-500 outline-none"
        overlayClassName="fixed inset-0 bg-black/10 backdrop-blur-sm"
      >
        {/* Close Button */}
        <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-200 hover:text-gray-50">
          ✕
        </button>

        {/* User Info */}
        <div className="text-center">
          <FaUserCircle className="text-5xl text-gray-600 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">{userId}</h3>
          <p className="text-sm ">johndoe@gmail.com</p>
        </div>

        {/* Actions */}
        <div className="mt-4 border-t pt-2">
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">Manage Account</button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md" onClick={handleLogout}>Sign Out</button>
        </div>
      </Modal>
    </div>

  )
}

export default UserProfile
