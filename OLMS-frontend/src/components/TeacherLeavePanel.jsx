import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import axiosInstance from './axiosInstance';
import google from '../assets/hodpage/google-docs.png';

const TeacherLeavePanel = () => {

    const headers = ['Leave ID','Student ID','From Date','To Date','Reason','Grant/Reject Leave'];
    const [applications, setApplications] = useState([]);
  
  const userId = useRecoilValue(userState);
  
  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
      const response = await axiosInstance.get('http://localhost:8080/leave/leaveDetails');
      console.log("API Response:", response.data);
      
      
        setApplications(response.data);
      
      
    } catch (error) {
      console.error("Error:", error);
      setApplications([]); // Prevents errors if API fails
    }
    };

    fetchDetails();
  }, []);

  const handleGrantApplication = async (id) => {
    try {
      const data = {
        leaveStatus: 'Granted',  
      };
      const response = await axiosInstance.patch(`http://localhost:8080/leave/patch/${id}`,data);
      // Remove the deleted application from state
      setApplications(response.data);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  const handleRejectApplication = async (id) => {
    try {
      const data = {
        leaveStatus: 'Rejected',  // The field you want to update
      };
      const response = await axiosInstance.patch(`http://localhost:8080/leave/patch/${id}`,data);
      // Remove the deleted application from state
      setApplications(response.data);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  

  
      
  return (
    <div>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-studentleft via-studentcenter to-studentright min-h-44 flex relative">
            <div className="absolute top-10 left-20 flex justify-center items-center">
              <img className="w-16 h-auto mt-6" src={google} alt="docs" />
            </div>
            <div className="absolute top-20 left-40 font-bold text-4xl">Applications</div>
          </div>
    
          <table className="table-auto w-full">
            <thead className="bg-lightgray text-2xl">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-3 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-tbody text-center text-xl p-3">
                {

                applications.map((app) =>(
                    <tr key={app.leaveId}>
                        <td>{app.leaveId}</td>
                        <td>{app.studentId}</td>
                        <td>{app.fromDate}</td>
                        <td>{app.toDate}</td>
                        <td className='break-words whitespace-normal max-w-[200px]'>{app.leaveReason}</td>
                        <td className='flex justify-evenly  text-white mt-3'>
                            <button className='bg-green-500 py-2 px-5 rounded-md '
                            onClick={() => handleGrantApplication(app.leaveId)}>Grant</button>
                            <button className='bg-red-600 py-2 px-5 rounded-md '
                            onClick={() => handleRejectApplication(app.leaveId)}>Deny</button>
                        </td>
                       
                    </tr>
                
                ))
              }
            </tbody>
          </table>
        </div>
  )
}

export default TeacherLeavePanel
