import React, { useEffect, useState } from 'react';
import fig1 from '../assets/fig1.png';
import LoginPage from './LoginPage';
import { useRecoilValue } from 'recoil';
import { roleState } from './atom';
import { useNavigate } from 'react-router-dom';
import FeaturesComonent from './FeaturesComonent';

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
    <div className="font-sans bg-[#f6f9f9]">
      <div className="grid grid-rows-1 sm:grid-cols-2 gap-4 mb-10">
        <div className='mt-16 sm:mt-28 sm:col-span-1'>
          <div className="sm:mt-9 ml-10 sm:ml-20 relative">
            <div className="absolute md:left-24">
              <div>
                {features.map(({ title, description }, index) => (
                  <div key={index} className="flex flex-row items-end text-center">
                    <h1 className="text-darkblue font-medium  text-[46px] sm:leading-sung ">{title}</h1>
                    <p className=" text-[20px] text-nowrap sm:pl-2 sm:py-2 pl-4 mb-[10px] sm:mb-[3px] text-gray-700">{description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={openModal} 
                className="border text-xl rounded-full hover:bg-gradient-to-r hover:from-[#0097b2] hover:to-[#7ed957] bg-white text-black hover:text-white border-black px-4 py-2 mt-5"
              >
                <span className="text-nowrap">Get started</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-56 p-3 sm:mt-10 sm:col-span-1 ">
          <img
            className="flex justify-center mt-16 sm:ml-20 items-center md:max-w-[460px]"
            src={fig1}
            alt="Leave Management Illustration"
          />
        </div>
      </div>

      <div className='mt-20 '>
        <div>
          <p className='font-bold text-[46px] text-center text-darkblue'>Why <span className='text-[40px] text-[#37be46]'>OLMS?</span></p>
        </div>
        <div>

        <FeaturesComonent/>
        </div>
      </div>
      
    {showModal && <LoginPage show={showModal} onRequestClose={closeModal} isOpen={showModal} />}
    
    </div>
  );
};

export default Hom;
