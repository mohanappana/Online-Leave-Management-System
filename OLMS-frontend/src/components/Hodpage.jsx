import React, { useEffect } from 'react'
import addteacher from '../assets/hodpage/addt.png'
import data from '../assets/hodpage/data-analysis.png'
import study from '../assets/hodpage/study.png'
import { Outlet, useNavigate } from 'react-router-dom'
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
    
    <div className="grid grid-flow-row mb-20">
      <div className="bg-gradient-to-r from-hodleft via-hodcenter to-hodright flex flex-row relative min-h-80">
        <div className="absolute top-20 left-20 text-3xl basis-1/2 ">
          <p className="font-bold">Hi</p>
          <p className="font-bold text-5xl mt-6 mb-6">HoD Appana Mohan!</p>
          HoD is the head
        </div>
        {/* <div className="absolute top-20 right-44 basis-1/2">
          <p className="text-xl">Available leaves</p>
        </div> */}
      </div>
      <div className='mt-14 '>
        <p className='font-bold text-3xl ml-20'>Check out the latest here</p>
        <div className='mt-5 flex justify-around mb-18'>

          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={addteacher} alt={addteacher} />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border rounded-sm bg-green-500 text-white border-black text-xl px-2 py-2 mb-4' onClick={() => handleNavigation('/hodDashboard/addTeacher')}>Add Teacher</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={study} alt={addteacher} />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border bg-green-500 text-white border-black text-xl px-2 py-2 mb-4' onClick={() => handleNavigation('/hodDashboard/addStudent')}>Add Student</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center' >
              <img className='w-24 h-auto mt-6' src={data} alt={addteacher} /> 
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border bg-green-500 text-white border-black text-xl px-2 py-2 mb-4'>View Dashboard</button>
            </div> 
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Hodpage
