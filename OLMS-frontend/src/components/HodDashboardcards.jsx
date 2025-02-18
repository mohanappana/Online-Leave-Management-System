import React, { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance';
import { userState } from './atom';
import data from '../assets/hodpage/data-analysis.png'
import { useRecoilValue } from 'recoil';

const HodDashboardcards = () => {
    const userId = useRecoilValue(userState);
    const [Leaves,setLeaves] = useState([]);
    
  useEffect(() => {
      const fetchData = async () => {
          try{
              const response = await axiosInstance.get('/leave/hodDashboardDetails')
              console.log('guuu',response.data);
              
              setLeaves(response.data)
          }
          catch(error){
              console.error('error is coming',error);
          }
      }
      fetchData();
  },[userId])
  return (
    <div className=''>
        
        <div className='bg-gradient-to-r from-hodleft via-hodcenter to-hodright min-h-44 flex flex-nowrap relative '>
            <div className='flex absolute top-7 left-20  justify-center items-center'>
                <img className='w-24 h-auto mt-6' src={data} alt="study" />
            </div>
            <div className='ml-5 absolute top-20 left-40  font-bold text-4xl '>Dashboard</div>
        
        </div>
        <div className="relative top-20 pb-10">
            <div className=''>
                {Leaves.length > 0 && (
                    <div className="   mt-6 flex flex-wrap justify-center sm:justify-around gap-7 ">
                    {Object.entries(Leaves[0])
                        .slice(0, 3)
                        .map(([key, value], index) => (
                        <div
                            key={index}
                            className="bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg flex justify-center "
                        >   <div className='grid grid-flow-row'>

                            <p className="font-medium mt-5 text-xl">No. of {key} {(key ==="students" )?"":(key ==="teachers")? "":"leaves"}</p>
                            <p className=" text-8xl mb-7 text-center font-semibold text-[#37be46]">{value}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                )}
    
            </div>
    
            <div>
                {Leaves.length > 0 && (
                    <div className="mt-20 flex flex-wrap justify-center sm:justify-evenly gap-7 mb-10">
                    {Object.entries(Leaves[0])
                        .slice(3, 5)
                        .map(([key, value], index) => (
                        <div
                            key={index}
                            className="bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg flex items-center justify-center relative"
                        >
                            <p className="absolute top-6 font-medium text-xl">No. of {key} {(key ==="students" )?"":(key ==="teachers")? "":"leaves"}</p>
                            <p className="text-8xl mt-8 font-semibold text-[#37be46]">{value}</p>
                        </div>
                        ))}
                    </div>
                )}
            </div>
           
        </div>

    </div>    
  )
}

export default HodDashboardcards
