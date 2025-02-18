import React, { useEffect } from 'react'
import addteacher from '../assets/olms/teacher.png'
import data from '../assets/hodpage/data-analysis.png'
import study from '../assets/hodpage/study.png'
import google from '../assets/hodpage/google-docs.png';
import { useNavigate } from 'react-router-dom'
const Hodpage = () => {
  const navigate = useNavigate();
  useEffect(() =>{
    
    const loginRequest = async () => {
      
    }
  },[])
  const handleNavigation = (route) => {
    navigate(route); // This will navigate to the provided route
  };
  return (
    
    <div className="grid grid-flow-row mb-20 w-full">
      <div className="bg-gradient-to-r from-hodleft via-hodcenter to-hodright w-full flex flex-col sm:flex-row relative min-h-[500px] sm:min-h-80 px-6 sm:px-16 py-8 sm:py-16">
        <div className="text-center sm:text-left flex-1 flex flex-col justify-center ">
          <p className=" text-3xl font-bold">Hi</p>
          <p className="font-bold text-5xl mt-4 mb-4">HoD Appana Mohan!</p>
          <p className='text-2xl'>HoD is the head</p>
        </div>
        {/* <div className="absolute top-20 right-44 basis-1/2">
          <p className="text-xl">Available leaves</p>
        </div> */}
      </div>
      <div className='mt-14 '>
        <p className='font-bold text-3xl text-center sm:text-left sm:ml-20'>Check out the latest here</p>
        <div className='mt-6 flex flex-wrap justify-center sm:justify-around gap-7'>

          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={addteacher} alt={addteacher} />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border bg-lightgray hover:bg-green-500 hover:text-white rounded-lg border-black text-xl px-2 py-2 mb-4' onClick={() => handleNavigation('/hodDashboard/addTeacher')}>Add Teacher</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={study} alt={addteacher} />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border bg-lightgray hover:bg-green-500 hover:text-white rounded-lg border-black text-xl px-2 py-2 mb-4' onClick={() => handleNavigation('/hodDashboard/addStudentDetails')}>Add Student</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center' >
              <img className='w-24 h-auto mt-6' src={google} alt={addteacher} /> 
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border bg-lightgray hover:bg-green-500 hover:text-white rounded-lg border-black text-xl px-2 py-2 mb-4' onClick={() => handleNavigation('/hodDashboard/applications')}>Applications</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center' >
              <img className='w-24 h-auto mt-6' src={data} alt={addteacher} /> 
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border bg-lightgray hover:bg-green-500 hover:text-white rounded-lg border-black text-xl px-2 py-2 mb-4' onClick={() => handleNavigation('/hodDashboard/viewDashboard')}>View Dashboard</button>
            </div> 
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Hodpage
