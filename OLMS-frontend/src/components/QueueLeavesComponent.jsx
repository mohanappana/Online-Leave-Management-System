import React, { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance'
import { useRecoilValue } from 'recoil'
import { userState } from './atom'

const QueueLeavesComponent = () => {
    const userId = useRecoilValue(userState);
    const [queueLeavesCount,setQueueLeavesCount] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axiosInstance.get(`/leave/queueLeaves/${userId}`)
                console.log('guuu',response.data);
                console.log('userId',userId);
                setQueueLeavesCount(response.data)
            }
            catch(error){
                console.error('error is coming',error);
            }
        }
        fetchData();
    })
  return (
    <div className='w-[192px] flex justify-center '>
      <p className='text-8xl mt-8  text-[#37be46]'>{queueLeavesCount}</p>
    </div>
  )
}

export default QueueLeavesComponent
