import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../assets/hodpage/data-analysis.png'
import app from '../assets/hodpage/google-docs.png'
import study from '../assets/hodpage/study.png'
import { useRecoilValue } from 'recoil'
import { userState } from './atom'
import axiosInstance from './axiosInstance'




const Teacherpage = () => {
   const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();
  const teacherId = useRecoilValue(userState)

  useEffect(() => {
    const fectchDetails = async () => {
      try{
        const response = await axiosInstance.get(`http://localhost:8080/api/teacher/teacher/${teacherId}`)
        setUserDetails(response.data)
        console.log(response.data)
      }catch(error){
        console.log("Error in Fecthing userDetails",error);
      }
    }
    fectchDetails();
    }
  , [teacherId]);
 

  return (
    <div className='grid grid-flow-row mb-20 w-full'>
        <div className='bg-gradient-to-r from-teacherleft via-teachercenter to-teacherright w-full flex flex-col sm:flex-row relative min-h-[500px] sm:min-h-80 px-6 sm:px-16 py-8 sm:py-16'>
            <div className="text-center sm:text-left flex-1 flex flex-col justify-center ">
            <p className="text-3xl font-bold">Hi</p>
            <p className="font-bold text-5xl mt-4 mb-4">Teacher {teacherId !== null ? teacherId :'Appana Mohan'}!</p>
            <p className='text-2xl'>Teacher is the head</p>
            </div>
            {/* <div className="absolute top-20 right-44 basis-1/2">
               <p className="text-2xl text-center">Available leaves</p>
              <div className='bg-white'>
              9989864648
                

              </div> 
            </div> */}
        </div>
        <div className='mt-14 '>
        <p className='font-bold text-3xl text-center sm:text-left sm:ml-20'>Check out the latest here</p>
        
        <div className='mt-6 flex flex-wrap justify-center sm:justify-around gap-7'>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={study} alt="study" />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button onClick={() => navigate('/teacherDashboard/addstudent')} className='border-2 bg-lightgray hover:bg-bpink hover:text-white rounded-lg border-black text-xl px-2 py-2 mb-4'>Add Student</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={app} alt="study" />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button onClick={() => navigate('/teacherDashboard/leavePanel')} className='border-2 bg-lightgray hover:bg-bpink hover:text-white rounded-lg border-black text-xl px-2 py-2 mb-4'>Applications</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center' >
              <img className='w-24 h-auto mt-6' src={data} alt="study" /> 
            </div>
            <div className='text-center mt-10 mb-1'>
              <button onClick={() => navigate('/teacherDashboard/viewDashboard')} className='border-2  bg-lightgray hover:bg-bpink hover:text-white rounded-lg border-black  text-xl px-2 py-2 mb-4'>View Dashboard</button>
            </div> 
          </div>
          
        </div>

        </div>
      
    </div>
  )
}

export default Teacherpage
