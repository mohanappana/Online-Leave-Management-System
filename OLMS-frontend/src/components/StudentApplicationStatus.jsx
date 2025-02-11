import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import google from '../assets/hodpage/google-docs.png';
import GraphToggle from './GraphToggle';

const StudentApplicationStatus = () => {
  const [applicationDetails, setApplicationDetails] = useState([]);
  const headers = ['Leave ID', 'From Date', 'To Date', 'Reason', 'Action', 'Status'];
  const studentId = useRecoilValue(userState);
 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8080/leave/student/${studentId}`);
       // console.log(response.data);
        setApplicationDetails(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDetails();
  }, [studentId]);

  const deleteApplication = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/leave/delete/${id}`);
      // Remove the deleted application from state
      setApplicationDetails((prevDetails) => prevDetails.filter(app => app.leaveId !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-studentleft via-studentcenter to-studentright min-h-44 flex relative">
        <div className="absolute top-10 left-20 flex justify-center items-center">
          <img className="w-16 h-auto mt-6" src={google} alt="docs" />
        </div>
        <div className="absolute top-20 left-40 font-bold text-4xl">Applications</div>
      </div>

      <table className="w-full ">
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
          {applicationDetails.length > 0 ? (
            applicationDetails.map((application, index) => (
              <tr key={index}>
                <td>{application.leaveId}</td>
                <td>{application.fromDate}</td>
                <td>{application.toDate}</td>
                <td>{application.leaveReason}</td>
                <td>
          <button
            disabled={application.leaveStatus === 'Rejected'? true:false}
            className={`${application.leaveStatus === 'Rejected' ? 'bg-red-300' : 'bg-red-600'} text-white px-3 mt-2 py-2 rounded`}
            // onClick={() => deleteApplication(app.id)} // Define this function or handle accordingly
            
            onClick={() => deleteApplication(application.leaveId)}
          >
            Delete
          </button>
        </td>
        <td>
          <button
            disabled
            className={`px-3 py-2 space-y-2 mt-2 rounded text-white ${
              application.leaveStatus === 'Pending' ? 'bg-blue-400' : application.leaveStatus ==='Approved'? 'bg-green-500': 'bg-red-600'
            }`}
            // Define this function or handle accordingly
          >
            {application.leaveStatus}
          </button>
        </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-4">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentApplicationStatus;
