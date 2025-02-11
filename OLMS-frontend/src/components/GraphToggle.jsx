import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  PointElement,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import axiosInstance from "./axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "./atom";
import StudentDashboardCards from "./StudentDashboardCards";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Tooltip, PointElement, Legend);

const GraphToggle = () => {
  const studentId = useRecoilValue(userState);
  const [graphLabels, setGraphLabels] = useState({});

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8080/leave/graph/${studentId}`);
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

  // Prepare the chart data
  const data = {
    labels: month, // Use keys as labels
    datasets: [
      {
        label: "Bar Graph",
        type: "bar",
        data: Object.values(graphLabels), // Use values for bar graph
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Bar color
        stack: "combined",
      },
      {
        label: "Line Graph",
        type: "line",
        data: Object.values(graphLabels), // Example line data
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
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Leaves Graph</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <Chart type="bar" data={data} options={options} />
      </div>
      <div>
        <StudentDashboardCards/>
      </div>
    </div>
  );
};

export default GraphToggle;
