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
    <div className='grid grid-flow-row mb-20'>
        <div className='bg-gradient-to-r from-teacherleft via-teachercenter to-teacherright flex flex-row relative min-h-96'>
            <div className="absolute top-20 left-20 text-3xl basis-1/2 ">
            <p className="font-bold">Hi</p>
            <p className="font-bold text-5xl mt-6 mb-6">Teacher Appana Mohan!</p>
            Teacher is the head
            </div>
            <div className="absolute top-20 right-44 basis-1/2">
              {/* <p className="text-2xl text-center">Available leaves</p>
              <div className='bg-white'>
              9989864648
                

              </div> */}
            </div>
        </div>
        <div className='mt-14 '>
        <p className='font-bold text-3xl ml-20'>Check out the latest here</p>
        <div className='mt-5 flex justify-around mb-18'>

          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={study} alt="study" />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button onClick={() => navigate('/teacherDashboard/addstudent')} className='border-2 bg-bpink text-white border-black text-xl px-2 py-2 mb-4'>Add Student</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={app} alt="study" />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button onClick={() => navigate('/teacherDashboard/leavePanel')} className='border-2 bg-bpink text-white border-black text-xl px-2 py-2 mb-4'>Applications</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center' >
              <img className='w-24 h-auto mt-6' src={data} alt="study" /> 
            </div>
            <div className='text-center mt-10 mb-1'>
              <button onClick={() => navigate('/teacherDashboard/viewDashboard')} className='border-2  bg-bpink text-white border-black  text-xl px-2 py-2 mb-4'>View Dashboard</button>
            </div> 
          </div>
          
        </div>

        </div>
      
    </div>
  )
}

export default Teacherpage
