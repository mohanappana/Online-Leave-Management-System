import React, { useEffect } from 'react'
import StudentDashboard from './StudentDashboard'
import QueueLeavesComponent from './QueueLeavesComponent';
import GrantedvsRejectedLeavesComponet from './GrantedvsRejectedLeavesComponet';

const StudentDashboardCards = () => {
    useEffect(() => {
        //const fetchallDetails = async
    },[])
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <div>
      <div className=' flex flex-wrap justify-center sm:justify-evenly relative top-32 pb-20 gap-7'>
        <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 flex flex-col items-center justify-center relative'>
          <p className='text-center absolute top-6 font-medium text-xl'>Avaiable leaves in {month[currentMonth]}</p>
          <div className='mt-8'>
            <StudentDashboard total='a6a6a6' avaliable='37be46' width='w-[140px]'/>

          </div>
        </div>
        
            
        
        <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 flex flex-col relative items-center justify-center'>
          <p className='absolute top-6 font-medium text-xl'>Leaves in Queue</p>
          <QueueLeavesComponent/>
        </div>
        <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 px-8 flex flex-col relative items-center justify-center'>
          <p className='absolute top-6 font-medium text-xl'>Grant Vs Rejected</p>
          <GrantedvsRejectedLeavesComponet />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboardCards
