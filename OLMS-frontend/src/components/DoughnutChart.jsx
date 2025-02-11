import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ leaveData }) => {
    // Chart.js configuration
    const chartData = {
        labels: [], // Labels for the chart
        datasets: [
            {
                label: 'Leave Distribution',
                data: [1,3,2], // Array of numbers: [approved, pending, rejected]
                backgroundColor: ['#FFA500', '#d3d3d3' ], // Colors for each section
                hoverBackgroundColor: ['#FFA600', '#ffffff'], // Colors on hover
            },
        ],
    };

    const chartOptions = {
        responsive: true, // Makes the chart responsive
        maintainAspectRatio: false, // Allows custom height/width
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
            tooltip: {
                enabled: true, // Enable tooltips on hover
            },
        },
        cutout:'80%',
    };

    return (
        <div style={{ width: '200px', height: '200px' }}>
            <Doughnut data={chartData} options={chartOptions} />
        </div>
    );
};

export default DoughnutChart;
