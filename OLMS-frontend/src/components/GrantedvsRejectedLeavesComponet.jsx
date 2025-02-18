import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from './axiosInstance';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

const GrantedvsRejectedLeavesComponent = () => {
  const [leaveDetails, setLeaveDetails] = useState({ approved: 0, rejected: 0 });
  const latestValues = useRef({ approved: 0, rejected: 0, percentage: 0 });
  const userId = useRecoilValue(userState);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/leave/rejectandapproved/${userId}`);
      setLeaveDetails({
        approved: response.data.approved,
        rejected: response.data.rejected,
      });
      latestValues.current = {
        approved: response.data.approved,
        rejected: response.data.rejected,
        percentage: (response.data.approved + response.data.rejected) > 0 
          ? Math.trunc((response.data.approved / (response.data.rejected + response.data.approved)) * 100)
          : 0,
      };
      console.log(latestValues);
    };
    fetchData();
  }, [userId]);

  const data = React.useMemo(() => ({
    labels: [],
    datasets: [
      {
        data: [leaveDetails.approved || 0, leaveDetails.rejected || 0],
        backgroundColor: ['#37be46', '#fa0606'],
        borderColor: ['#37be46', '#9ca3af'],
        borderWidth: 1,
      },
    ],
  }), [leaveDetails]);

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
    cutout: '70%',
    responsive: true,
  };

  const plugins = [
    {
      id: 'centerText',
      beforeDraw: (chart) => {
        const { approved, rejected, percentage } = latestValues.current;
        const { width, height, ctx } = chart;
        ctx.restore();
        ctx.font = '25px em sans-serif';
        ctx.textBaseline = 'middle';
        const text = `${percentage} %`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <div className='w-[140px] mt-8'>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
};

export default GrantedvsRejectedLeavesComponent;
