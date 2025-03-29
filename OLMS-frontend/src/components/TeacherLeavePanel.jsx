import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import axiosInstance from './axiosInstance';
import google from '../assets/hodpage/google-docs.png';
import CustomSnackbar from './CustomSnackbar';

const TeacherLeavePanel = ({left,center,right}) => {

    const headers = ['Leave ID','Student ID','From Date','To Date','Reason','Grant/Reject Leave'];
    const [applications, setApplications] = useState([]);
    const [pendingApplications, setPendingApplications] = useState([]);
    const [otherApplications, setOtherApplications] = useState([]);

  
  const userId = useRecoilValue(userState);
  const [snackbarOpenGrant, setSnackbarOpenGrant] = useState(false);
  const [snackbarOpenReject, setSnackbarOpenReject] = useState(false);
  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
      const response = await axiosInstance.get('/leave/leaveDetails');
      console.log("API Response:", response.data);
      
      
        setApplications(response.data);
      
      
    } catch (error) {
      console.error("Error:", error);
      setApplications([]); // Prevents errors if API fails
    }
    };

    fetchDetails();
  }, []);


   useEffect(() => {
      setPendingApplications(applications.filter(app => app.leaveStatus === 'Pending')
      );
      setOtherApplications(applications.filter(app => app.leaveStatus !== 'Pending'));
      console.log(otherApplications,"otherApplications")
    }, [applications]);

  

    const handleGrantApplication = async (id) => {
      try {
        const data = { leaveStatus: 'Approved',userId: userId };
        const response = await axiosInstance.patch(`/leave/patch/${id}`, data);
        const updatedApplications = applications.map(app =>
          app.leaveId === id ? { ...app, leaveStatus: 'Approved' } : app
        );
        setApplications(updatedApplications); 
        setSnackbarOpenGrant(true);
      } catch (error) {
        console.error("Error updating application:", error);
      }
    };
  
    const handleRejectApplication = async (id) => {
      try {
        const data = { leaveStatus: 'Rejected',userId: userId };
        const response = await axiosInstance.patch(`/leave/patch/${id}`, data);
        const updatedApplications = applications.map(app =>
          app.leaveId === id ? { ...app, leaveStatus: 'Rejected' } : app
        );
        setApplications(updatedApplications); 
        setSnackbarOpenReject(true);
        return response.data;
      } catch (error) {
        console.error("Error updating application:", error);
      }
    };
  

  
      
  return (
    <div>
          {/* Header Section */}
          <div className="min-h-44 flex relative"
            style={{
              background: `linear-gradient(to right, ${left}, ${center}, ${right})`,
            }}> 
            <div className="absolute top-10 left-14 sm:left-20 flex justify-center items-center">
              <img className="w-16 h-auto mt-6" src={google} alt="docs" />
            </div>
            <div className="absolute top-20 left-32 sm:left-40 font-bold text-4xl">Applications</div>
          </div>
          
          {pendingApplications.length >0 &&
          <>
          <h2 className='text-2xl text-center font-bold my-5 text-blue-600 '>
            Pending Applications
          </h2>
           <div className='overflow-x-auto mx-4 sm:mx-10 mt-8'>
            <table className=" w-full max-w-6xl">
              <thead className="bg-lightgray text-2xl">
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className="px-3 py-2 pl-1">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-tbody text-center text-xl p-3">
                  {

                  pendingApplications.map((app) =>(
                      <tr key={app.leaveId} className="border-b border-gray-300">
                          <td className="py-4">{app.leaveId}</td>
                          <td className="py-4">{app.studentId}</td>
                          <td className="py-4">{app.fromDate}</td>
                          <td className="py-4">{app.toDate}</td>
                          <td className='break-words whitespace-normal max-w-[200px] py-4'>{app.leaveReason}</td>
                          <td className='flex justify-evenly  text-white py-4'>
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
          </>
          }
          
          {otherApplications.length > 0 &&
          <>
          <h2 className='text-2xl text-center mt-10 font-bold my-5 text-green-600'>
            Approved & Rejected Applications
          </h2>
           <div className=' overflow-x-auto mx-4 sm:mx-10 mt-8'>
            <table className=" w-full max-w-6xl">
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

                  otherApplications.map((app) =>(
                      <tr key={app.leaveId} className="border-b border-gray-300">
                          <td className="py-4">{app.leaveId}</td>
                          <td className="py-4">{app.studentId}</td>
                          <td className="py-4">{app.fromDate}</td>
                          <td className="py-4">{app.toDate}</td>
                          <td className='break-words whitespace-normal max-w-[200px] py-4'>{app.leaveReason}</td>
                          <td className='flex justify-evenly  text-white py-4'>
                              <button disabled className={`${app.leaveStatus === 'Approved'?'bg-green-500':'bg-red-500'} py-2 px-5 rounded-md `}
                              >{app.leaveStatus}</button>
                              
                          </td>
                        
                      </tr>
                  
                  ))
                }
              </tbody>
            </table>
          </div>
          </>
          }
          <CustomSnackbar
          open={snackbarOpenReject}
          onClose={() => setSnackbarOpenReject(false)}
          autoHideDuration={2000}
          message="Leave Rejected Successfully!"
          severity="error"
          />
          <CustomSnackbar
          open={snackbarOpenGrant}
          onClose={() => setSnackbarOpenGrant(false)}
          autoHideDuration={2000}
          message="Leave Approved SuccessFully!"
          severity="success"
          />
        </div>
  )
}

export default TeacherLeavePanel
