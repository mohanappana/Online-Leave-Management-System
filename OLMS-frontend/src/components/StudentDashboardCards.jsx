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
      <div className=' flex flex-row items-center justify-evenly relative top-32'>
        <div >
            
            <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 flex flex-col items-center justify-center relative'>
             <p className='text-center absolute top-6'>Avaiable leaves in {month[currentMonth]}</p>
             <div>
                <StudentDashboard color={'37be46'} width={'w-[140px]'}/>

             </div>
            </div>
        </div>
        <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 flex flex-col relative items-center justify-center'>
          <p className='absolute top-6'>Leaves in Queue</p>
          <QueueLeavesComponent/>
        </div>
        <div className='bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg mt-4 px-8 flex flex-col relative items-center justify-center'>
          <p className='absolute top-6'>Grant Vs Rejected</p>
          <GrantedvsRejectedLeavesComponet />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboardCards
