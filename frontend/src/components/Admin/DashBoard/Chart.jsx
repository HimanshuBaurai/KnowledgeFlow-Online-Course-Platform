import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend);



const getLastYearMonths = () => {
  const labels = [];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonth = new Date().getMonth(); //current month
  // const remain = 11 - currentMonth;//remaining months

  for (let i = currentMonth; i >= 0; i--) {
    const element = months[i];
    labels.unshift(element);
  }
  for (let i = 11; i > currentMonth; i--) {
    const element = months[i];
    labels.unshift(element);
  }
  return labels;
}


export const LineChart = ({dataArray=[]}) => {
  const labels = getLastYearMonths();
  const options = {
    resposive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Views',
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: dataArray,
        borderColor: 'rgba(107, 70, 193, 0.5)',
        backgroundColor: '#6b46c1',
      },
    ],
  }

  return (
    <Line options={options} data={data} />
  )
}


export const DoughnutChart = ({ dataArray = [] }) => {
  const labels = ['Subscribed', 'Not Subscribed']; // labels for the chart
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Views',
        data: dataArray,
        borderColor: ['rgba(62,12,171,1)', 'rgba(214,43,129,1)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'], // colors for the chart
        borderWidth: 1,
      },
    ],
  }// data for the chart
  // dataArray  is an array of two elements, first element is the number of subscribed users and second element is the number of unsubscribed users

  return (
    <Doughnut data={data} />
  )
}
