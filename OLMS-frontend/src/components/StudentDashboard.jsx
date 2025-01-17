import React from 'react'
import google from '../assets/hodpage/google-docs.png';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentDashboard = () => {
  const data = {
    labels: ["Applied Leaves"],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ["#36A2EB", "#FFFFFF"],
        borderColor: ["#36A2EB", "#FFFFFF"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips
      },
      legend: {
        display: false, // Optionally hide the legend
      },
    },
    cutout: "70%", // Adjust the hollow center size if needed
    responsive: true,
  };

  const plugins = [
    {
      id: "centerText",
      beforeDraw: (chart) => {
        const { width, height, ctx } = chart;

        ctx.restore();
        const fontSize = (height / 150).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = "middle";

        const text = "30%";
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];
  
  return (
    <div>
        <div className="bg-gradient-to-r from-studentleft via-studentcenter to-studentright min-h-44 flex relative">
                <div className="absolute top-10 left-20 flex justify-center items-center">
                  <img className="w-16 h-auto mt-6" src={google} alt="docs" />
                </div>
                <div className="absolute top-20 left-40 font-bold text-4xl">Dashboard</div>
        </div>
        <div>
            <div className='border-2'>
                <p>Avaiable leaves in Dec</p>
                <img src="" alt="" />
            </div>
            <div className='w-[240px]'>
              <h2>Leaves Distribution</h2>
              <Doughnut data={data}  options={options}  plugins={plugins} />
            </div>

        </div>
    </div>
  )
}

export default StudentDashboard
