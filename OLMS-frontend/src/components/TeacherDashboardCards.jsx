import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import axiosInstance from './axiosInstance';

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
    <div className='flex flex-row items-center justify-evenly'>
      {
      Leaves.length > 0 &&
      Object.entries(Leaves[0]).map(([key,value],index) =>(

      
      <div key={index} className='flex flex-row items-center justify-evenly relative top-32'>
        <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 flex flex-col items-center justify-center relative'>
          <p className='absolute top-6'>No. of {key} leaves</p>
          <p className='text-6xl text-[#37be46]'>{value}</p>
        </div>
        {/* <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 flex flex-col items-center justify-center relative'>
          <p className='absolute top-6'>No. of leaves</p>
          
        </div>
        <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 flex flex-col items-center justify-center relative'>
          <p className='absolute top-6'>No. of leaves</p>
        </div> */}

      </div>
      ))
      }
    </div>
  )
}

export default TeacherDashboardCards
