import React, { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance';
import { userState } from './atom';
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
    <div className="relative top-20 pb-10">
        <div className=''>
            {Leaves.length > 0 && (
                <div className="flex justify-around  ">
                {Object.entries(Leaves[0])
                    .slice(0, 3)
                    .map(([key, value], index) => (
                    <div
                        key={index}
                        className="bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg flex items-center justify-center relative"
                    >
                        <p className="absolute text-lg top-6">No. of {key} {(key ==="students" )?"":(key ==="teachers")? "":"leaves"}</p>
                        <p className="text-6xl font-semibold text-[#37be46]">{value}</p>
                    </div>
                    ))}
                </div>
            )}

        </div>

        <div>
            {Leaves.length > 0 && (
                <div className="flex justify-evenly mt-20">
                {Object.entries(Leaves[0])
                    .slice(3, 5)
                    .map(([key, value], index) => (
                    <div
                        key={index}
                        className="bg-lightgray w-72 h-72 rounded-3xl overflow-hidden shadow-lg flex items-center justify-center relative"
                    >
                        <p className="absolute top-6 text-lg">No. of {key} {(key ==="students" )?"":(key ==="teachers")? "":"leaves"}</p>
                        <p className="text-6xl font-semibold text-[#37be46]">{value}</p>
                    </div>
                    ))}
                </div>
            )}
        </div>
       
    </div>

  )
}

export default HodDashboardcards
