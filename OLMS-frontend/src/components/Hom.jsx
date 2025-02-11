import React, { useEffect, useState } from 'react';
import fig1 from '../assets/fig1.png';
import LoginPage from './LoginPage';
import { useRecoilValue } from 'recoil';
import { roleState } from './atom';
import { useNavigate } from 'react-router-dom';

const Hom = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const userRole = useRecoilValue(roleState);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if(token){
      
      const roleRoutes = {
        STUDENT: "/studentDashboard",
        TEACHER: "/teacherDashboard",
        HOD: "/hodDashboard",
      };
      navigate(roleRoutes[userRole])
    }else{
      setIsLoading(false);
    }
  },[userRole,navigate])
  
  const features = [
    { title: "Simplify", description: "Leave Management" },
    { title: "Streamline", description: "Approvals" },
    { title: "Enhance", description: "Institute Efficiency" },
  ];

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder while loading
  }
  return (
    <div className="font-sans">
      <div className="grid grid-rows-1 sm:grid-cols-2 gap-4 mb-10">
        <div className='mt-36 sm:col-span-1'>
          <div className="mt-10 ml-20 relative">
            <div className="absolute md:left-24">
              <div>
                {features.map(({ title, description }, index) => (
                  <div key={index} className="flex flex-row text-center mt-3">
                    <h1 className="text-darkblue font-medium text-5xl mb-2">{title}</h1>
                    <p className="text-xl text-nowrap sm:pl-2 sm:py-2 pl-4 py-4 text-gray-700">{description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={openModal} 
                className="border-2 text-xl rounded-full bg-blue-600 text-white border-black px-4 py-2 mt-10"
              >
                <span className="text-nowrap">Get started</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:col-span-1 ">
          <img
            className="justify-center items-center md:w-full"
            src={fig1}
            alt="Leave Management Illustration"
          />
        </div>
      </div>

    {/* modal will conditionally render */}
      
    {showModal && <LoginPage show={showModal} onRequestClose={closeModal} isOpen={showModal} />}
    
    </div>
  );
};

export default Hom;
