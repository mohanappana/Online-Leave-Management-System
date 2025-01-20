import React, { useEffect, useState } from 'react'
import data from '../assets/hodpage/data-analysis.png'
import accept from '../assets/hodpage/accept.png'
import app from '../assets/hodpage/google-docs.png'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { userState } from './atom'
import axiosInstance from './axiosInstance'
import { useNavigate } from 'react-router-dom'

const StudentPage = () => {
  const [userDetails, setUserDetails] = useState();
  const studentId = useRecoilValue(userState)
  const navigate = useNavigate();
  console.log(userState);
  // useEffect(() => {
  //   const fecthStudentDetails = async () => {
  //     try {
  //       const response = await axiosInstance.get(`student/student/${user.studentId}`)
  //       setUserDetails(response.data);
  //     } catch (error) {
  //       console.log("Student details not found",error)
  //     }
  //   }
  //   fecthStudentDetails();
  // },[user])

  useEffect(() => {
    if (studentId) {
      // Now you can use studentId for API calls or other logic
      console.log('Logged-in student ID:', studentId);
      
      // Example: Fetch data based on studentId
      axios.get(`http://localhost:8080/api/student/student/${studentId}`)
        .then(response => {
          console.log(response.data);  // handle the response
        })
        .catch(error => {
          console.error('Error fetching student data:', error);
        });
    }
  }, [studentId]);


  const handleNavigation = (route) => {
    navigate(route);
  }
  return (
    <div className='grid grid-flow-row mb-20'>
        <div className='bg-gradient-to-r from-studentleft via-studentcenter to-studentright flex flex-row relative min-h-80'>
            <div className="absolute top-20 left-20 text-3xl basis-1/2 ">
            <p className="font-bold">Hi</p>
            <p className="font-bold text-5xl mt-6 mb-6">{`Hello, ${userDetails?.name || 'Student'}!`}</p>
            Student studies
            </div>
            <div className="absolute top-20 right-44 basis-1/2">
            <p className="text-xl">Available leaves</p>
            </div>
        </div>
        <div className='mt-14 '>
        <p className='font-bold text-3xl ml-20'>Check out the latest here</p>
        <div className='mt-5 flex justify-around mb-18'>

          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={accept} alt="study" />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border-2 bg-byellow text-white border-black text-xl px-10 py-2 mb-4' onClick={() => handleNavigation("/studentDashboard/applyLeave")}>Apply</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={app} alt="study" />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border-2 bg-byellow text-white border-black text-xl px-4 py-2 mb-4' onClick={() => handleNavigation("/studentDashboard/applications")}>Applications</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center' >
              <img className='w-24 h-auto mt-6' src={data} alt="study" /> 
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border-2 border-black  text-xl px-2 py-2 mb-4' onClick={() => handleNavigation("/studentDashboard/details")}>View Dashboard</button>
            </div> 
          </div>
        </div>

        </div>
      
    </div>
  )
}

export default StudentPage
