import React, { useEffect, useState } from "react";
import data from "../assets/hodpage/data-analysis.png";
import accept from "../assets/hodpage/accept.png";
import app from "../assets/hodpage/google-docs.png";
import { useRecoilValue } from "recoil";
import { userState } from "./atom";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";

const StudentPage = () => {
  const [userDetails, setUserDetails] = useState();
  const studentId = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `api/student/student/${studentId}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.log("Student details not found", error);
      }
    };
    fetchStudentDetails();
  }, [studentId]);

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="grid grid-flow-row mb-20 w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-studentleft via-studentcenter to-studentright w-full flex flex-col sm:flex-row relative min-h-[500px] sm:min-h-80 px-6 sm:px-16 py-8 sm:py-16">
        {/* Greeting Section */}
        <div className="text-black text-center sm:text-left flex-1 flex flex-col justify-center">
          <p className="text-3xl font-bold">Hi</p>
          <p className="font-bold text-5xl mt-4 mb-4">
            {`Student, ${studentId.toUpperCase() || "Student"}!`}
          </p>
          <p className="text-2xl ">Student studies</p>
        </div>

        {/* Leaves Available Section */}
        <div className="mt-8 sm:mt-0 sm:absolute sm:right-44 flex-1 text-center sm:text-right">
          <p className="text-xl text-black font-bold">Leaves Available</p>
          <div className="flex justify-center sm:justify-end">
            <StudentDashboard
              total={"a6a6a6"}
              avaliable={"00bf63"}
              width={"w-[192px]"}
            />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-14">
        <p className="font-bold text-3xl text-center sm:text-left sm:ml-20">
          Check out the latest here
        </p>

        <div className="mt-6 flex flex-wrap justify-center sm:justify-around gap-7">
          {/* Apply Card */}
          <div className="bg-lightgray w-60 sm:w-80 rounded-3xl shadow-lg px-4 sm:px-8 py-6">
            <div className="flex justify-center items-center">
              <img className="w-24 h-auto mt-4" src={accept} alt="study" />
            </div>
            <div className="text-center mt-6">
              <button
                className="border-2 bg-lightgray hover:bg-byellow hover:text-white rounded-lg border-black text-lg sm:text-xl px-6 py-2 mb-2"
                onClick={() => handleNavigation("/studentDashboard/applyLeave")}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Applications Card */}
          <div className="bg-lightgray w-60 sm:w-80 rounded-3xl shadow-lg px-4 sm:px-8 py-6">
            <div className="flex justify-center items-center">
              <img className="w-24 h-auto mt-4" src={app} alt="study" />
            </div>
            <div className="text-center mt-6">
              <button
                className="border-2 bg-lightgray hover:bg-byellow hover:text-white rounded-lg border-black text-lg sm:text-xl px-6 py-2 mb-2"
                onClick={() => handleNavigation("/studentDashboard/applications")}
              >
                Applications
              </button>
            </div>
          </div>

          {/* View Dashboard Card */}
          <div className="bg-lightgray w-60 sm:w-80 rounded-3xl shadow-lg px-4 sm:px-8 py-6">
            <div className="flex justify-center items-center">
              <img className="w-24 h-auto mt-4" src={data} alt="study" />
            </div>
            <div className="text-center mt-6">
              <button
                className="border-2 bg-lightgray hover:bg-byellow hover:text-white rounded-lg border-black text-lg sm:text-xl px-6 py-2 mb-2"
                onClick={() => handleNavigation("/studentDashboard/details")}
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
