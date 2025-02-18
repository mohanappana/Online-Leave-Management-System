import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import google from '../assets/hodpage/google-docs.png';
import StudentApplicationsTable from './StudentApplicationsTable';

const StudentApplicationStatus = () => {
  const [applicationDetails, setApplicationDetails] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [otherApplications, setOtherApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const headers = ['Leave ID', 'From Date', 'To Date', 'Reason', 'Action', 'Status'];
  const studentId = useRecoilValue(userState);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8080/leave/student/${studentId}`);
        setApplicationDetails(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchDetails();
  }, [studentId]);

  useEffect(() => {
    setPendingApplications(applicationDetails.filter(app => app.leaveStatus === 'Pending')
    );
    setOtherApplications(applicationDetails.filter(app => app.leaveStatus !== 'Pending'));
  }, [applicationDetails]);

  const deleteApplication = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`http://localhost:8080/leave/delete/${id}`);
      setApplicationDetails(prevDetails => prevDetails.filter(app => app.leaveId !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-studentleft via-studentcenter to-studentright min-h-44 flex relative">
        <div className="absolute top-10 left-14 sm:left-20 flex justify-center items-center">
          <img className="w-16 h-auto mt-6" src={google} alt="docs" />
        </div>
        <div className="absolute top-20 left-32 sm:left-40 font-bold text-4xl">Applications</div>

      </div>

      {/* Pending Applications Table */}
      {pendingApplications.length > 0 && (
        <StudentApplicationsTable
          title="Pending Applications"
          applications={pendingApplications}
          headers={headers}
          deleteApplication={deleteApplication}
          isPending={true}
          loading={loading}
        />
      )}

      {/* Approved & Rejected Applications Table */}
      {otherApplications.length > 0 && (
        <StudentApplicationsTable
          title="Approved & Rejected Applications"
          applications={otherApplications}
          headers={headers}
          deleteApplication={deleteApplication}
          isPending={false}
          loading={loading}
        />
      )}
    </div>
  );
};

export default StudentApplicationStatus;
