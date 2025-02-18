import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import axiosInstance from './axiosInstance';
import data from '../assets/hodpage/data-analysis.png'
const TeacherDashboardCards = () => {
  const userId = useRecoilValue(userState);
  const [Leaves,setLeaves] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try{
              const response = await axiosInstance.get(`/leave/teacherDashboardDetails/${userId}`)
              console.log('guuu',response.data.rejected);
              console.log('userId',userId);
              setLeaves(response.data)
          }
          catch(error){
              console.error('error is coming',error);
          }
      }
      fetchData();
  },[userId])
  console.log("arrary",Leaves[0])
  return (
    <div className='relative'>
    <div className='bg-gradient-to-r from-teacherleft via-teachercenter to-teacherright  min-h-44'>
      <div className="absolute top-10 left-20 flex justify-center items-center">
        <img className="w-16 h-auto mt-6" src={data} alt="docs" />
      </div>
      <div className="absolute top-[78px] left-40 font-bold text-4xl">Dashboard</div>
    </div>
    <div className='flex flex-wrap items-center justify-evenly gap-7 pb-36'>
      {
      Leaves.length > 0 &&
      Object.entries(Leaves[0]).map(([key,value],index) =>(

      
      <div key={index} className='flex flex-row items-center justify-evenly relative top-28'>
        <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 flex flex-col items-center justify-center relative'>
          <p className='absolute font-medium text-xl top-6'>No. of {key} leaves</p>
          <p className='text-8xl mt-10  text-[#37be46]'>{value}</p>
        </div>
        

      </div>
      ))
      }
    </div>
    </div>
  )
}

export default TeacherDashboardCards
