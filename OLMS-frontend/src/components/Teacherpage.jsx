import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../assets/hodpage/data-analysis.png'
import app from '../assets/hodpage/google-docs.png'
import study from '../assets/hodpage/study.png'
import DoughnutChart from './DoughnutChart'

// Register necessary components for chart.js
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);


const Teacherpage = () => {
  const [leaveData, setLeaveData] = useState([0.5,0.5]);
  const navigate = useNavigate();
 
//   useEffect(() => {
//     // Replace this with an actual API call
//     fetch('http://localhost:8080/api/leave-stats')
//         .then((response) => response.json())
//         .then((data) => {
//             // Example data from API: { approved: 50, pending: 30, rejected: 20 }
//             const formattedData = [data.approved, data.pending, data.rejected];
//             setLeaveData(formattedData);
//         })
//         .catch((error) => console.error('Error fetching leave data:', error));
// }, []); 
  return (
    <div className='grid grid-flow-row mb-20'>
        <div className='bg-gradient-to-r from-teacherleft via-teachercenter to-teacherright flex flex-row relative min-h-96'>
            <div className="absolute top-20 left-20 text-3xl basis-1/2 ">
            <p className="font-bold">Hi</p>
            <p className="font-bold text-5xl mt-6 mb-6">Teacher Appana Mohan!</p>
            Teacher is the head
            </div>
            <div className="absolute top-20 right-44 basis-1/2">
              <p className="text-2xl text-center">Available leaves</p>
              <div className='bg-white'>
              9989864648
                {leaveData.length > 0 ? (
                  <DoughnutChart leaveData={leaveData} />
                   
                ) : (
                  <p>Loading...</p>
                )}

              </div>
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
              <button onClick={() => navigate('/addstudent')} className='border-2 bg-bpink text-white border-black text-xl px-2 py-2 mb-4'>Add Student</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={app} alt="study" />
            </div>
            <div className='text-center mt-10 mb-1'>
              <button onClick={() => navigate('/teacherLeavePanel')} className='border-2 bg-bpink text-white border-black text-xl px-2 py-2 mb-4'>Applications</button>
            </div> 
          </div>
          <div className='bg-lightgray w-60 rounded-3xl overflow-hidden shadow-lg mt-4 px-8'>
            <div className='flex justify-center items-center' >
              <img className='w-24 h-auto mt-6' src={data} alt="study" /> 
            </div>
            <div className='text-center mt-10 mb-1'>
              <button className='border-2 border-black  text-xl px-2 py-2 mb-4'>View Dashboard</button>
            </div> 
          </div>
          
        </div>

        </div>
      
    </div>
  )
}

export default Teacherpage
