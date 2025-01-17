import React, { useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Tooltip,PointElement, Legend);

const GraphToggle = () => {


  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Highlight Portion",
        type: "bar",
        data: [3, 5, 2, 4, 3], // Highlighted section (Bar)
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Bar color
        stack: "combined",
      },
      {
        
        type: "bar",
        data: [9, 14, 1, 1, 2], // Remaining section (Bar)
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Bar color
        stack: "combined",
      },
      
      {
              label: "Line Graph",
              type: "line",
              data: [9, 14, 1, 1, 2], // Line data
              borderColor: "rgba(54, 162, 235, 1)", // Line color
              backgroundColor: "rgba(54, 162, 235, 0.5)", // Fill color
              fill: false,
              tension: 0, // Smooth line
              borderWidth: 2,
              pointBackgroundColor: "rgba(54, 162, 235, 1)", // Point color
            },
    ],
  };

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
      <h1 className="text-2xl font-bold text-center mb-6">Mixed Bar and Line Graph</h1>
     
      <div className="bg-white shadow-lg rounded-lg p-4">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default GraphToggle;
