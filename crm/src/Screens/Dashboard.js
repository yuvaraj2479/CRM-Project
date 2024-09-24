import React from "react";
import NavBar from "../Components/Layouts/NavBar";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, 
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,  // X-axis for Bar chart
  LinearScale,    // Y-axis for Bar chart
  BarElement,     // Bars in the Bar chart
  ArcElement,     // Arcs for the Pie chart
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const storedRecords = JSON.parse(sessionStorage.getItem(currentUser.createusername + '_records')) || [];

  // Aggregating leads per date for the Bar chart
  const dateCounts = storedRecords.reduce((acc, record) => {
    const leadDate = record.LeadDate;
    if (acc[leadDate]) {
      acc[leadDate]++;
    } else {
      acc[leadDate] = 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(dateCounts), // LeadDate values
    datasets: [
      {
        label: 'Leads per Date',
        data: Object.values(dateCounts), // Count of leads per LeadDate
        backgroundColor: Object.keys(dateCounts).map(() => getRandomColor()),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Aggregating leads per Name for the Pie chart
  const nameCounts = storedRecords.reduce((acc, record) => {
    const { Name } = record;
    if (acc[Name]) {
      acc[Name]++;
    } else {
      acc[Name] = 1;
    }
    return acc;
  }, {});

  const chartData2 = {
    labels: Object.keys(nameCounts), // Names as labels
    datasets: [
      {
        data: Object.values(nameCounts), // Count of leads for each Name
        backgroundColor: Object.keys(nameCounts).map(() => getRandomColor()), // Random colors for each segment
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const currentValue = tooltipItem.raw;
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${currentValue} leads (${percentage}%)`;
          }
        }
      }
    },
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="dashboard">
      <NavBar />
      {
        storedRecords.length >= 1 ?
          <>
            <h1 className="text-2xl font-bold mt-6 px-6">Lead Dashboard</h1>
            <div className="flex border  m-2 pt-4 pb-4 px-2">
              <div className="w-full h-96">
                <Bar data={chartData} options={chartOptions} />
              </div>
              <div className="w-full h-96 ml-2">
                <Pie data={chartData2} options={chartOptions2} />
              </div>
            </div>
          </> : <>
            <div className="flex justify-center items-center min-h-screen">
              <div className="">
                <p className="text-4xl text-red-600 ">Create Records And Verify the Dashboard</p>
              </div>
            </div>
          </>
      }

    </div>
  );
};

export default Dashboard;
