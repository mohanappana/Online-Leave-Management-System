import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  Tooltip,
  PointElement,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import axiosInstance from "./axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "./atom";
import StudentDashboardCards from "./StudentDashboardCards";
import dataImage from '../assets/hodpage/data-analysis.png'

ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, LineElement, LineController, Tooltip, PointElement, Legend);

const GraphToggle = () => {
  const studentId = useRecoilValue(userState);
  const [graphLabels, setGraphLabels] = useState({});

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axiosInstance.get(`leave/graph/${studentId}`);
        console.log(response.data);
        setGraphLabels(response.data);
      } catch (error) {
        console.error("Fetching error", error);
      }
    };
    fetchGraphData();
  }, [studentId]);

  // Log the extracted values for debugging
  console.log(Object.keys(graphLabels), Object.values(graphLabels));
  const currentMonth = new Date().getMonth();
  const filteredValues = Object.values(graphLabels).slice(0, currentMonth + 1); 
console.log(filteredValues,"filter");
  // Prepare the chart data
  const data = {
    labels: Object.keys(graphLabels), 
    datasets: [
      {
        label: "Bar Graph",
        type: "bar",
        data: filteredValues, // Use values for bar graph
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Bar color
        stack: "combined",
      },
      {
        label: "Line Graph",
        type: "line",
        data: filteredValues, // Example line data
        borderColor: "rgba(54, 162, 235, 1)", // Line color
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Fill color
        fill: false,
        tension: 0, // Smooth line
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)", // Point color
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true, // Stacking for bars
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true, // Stack bars and line
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          min: 0,
          max: 3,
          callback: function (value) {
            return value;
          },
        },
        suggestedMax: 3,
      },
    },
  };

  return (
    <div className="grid grid-flow-row mb-20">

      <div className='bg-gradient-to-r from-studentleft via-studentcenter to-studentright flex flex-row relative min-h-44'>
        <div className='flex absolute top-7 left-14 sm:left-20  justify-center items-center'>
            <img className='w-24 h-auto mt-6' src={dataImage} alt="study" />
          </div>
        <div className=' ml-3 absolute top-20 left-36 sm:left-44  font-bold text-4xl '>Dashboard</div>
      </div>
      <div>

          <div className="container mt-5 lg:mx-auto sm:p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Leaves Graph</h1>
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-5xl w-full mx-auto">
            <Chart type="bar" data={data} options={options} />
          </div>
          <div>
            <StudentDashboardCards/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphToggle;
