import React, { useEffect, useState } from 'react';
import google from '../assets/hodpage/google-docs.png';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axiosInstance from './axiosInstance';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentDashboard = ({total,width,avaliable}) => {
  const [chartData, setChartData] = useState(undefined); // Default undefined
  const studentId = useRecoilValue(userState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8080/leave/doughnut/${studentId}`);
        console.log('API Response:', response.data);
        setChartData(response.data || 0); // Fallback to 0
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentId]);

  // calculatibg percentage of available leaves
  const percentage = chartData !== undefined ? Math.trunc((1-(chartData / 3)) * 100).toString()+" %" : "0 %";

  const data = React.useMemo(() => ({
    labels: [],
    datasets: [
      {
        data: [chartData || 0, 3 - (chartData || 0)],
        backgroundColor: [`#${total}`, `#${avaliable}`],
        borderColor: [`#${total}`, `#${avaliable}`],
        borderWidth: 1,
      },
    ],
  }), [chartData]);

  const options = {
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips on hover
      },
    },
    hover: {
      mode: null, // Disable hover interaction
    },
    animations: {
      hover: {
        duration: 0, // Disable hover animation
      },
    },  
    cutout: "70%",
    responsive: true,
  };

  const plugins = [
    {
      id: "centerText",
      beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.restore();
        
        ctx.font = `25px em sans-serif`;
        ctx.textBaseline = "middle";
        const text = percentage || "0";
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  if (chartData === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${width}`}> 
      
          
    <Doughnut data={data} options={options} plugins={plugins} />
        
    </div>
  );
};

export default StudentDashboard;
