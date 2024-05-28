// Result.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
// import './result.css';

const Result = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/testcase/${id}/stats/`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const chartData = {
    labels: data.map(row => new Date(row.recorded_time).toLocaleTimeString()),
    datasets: [
      {
        label: 'RPS',
        data: data.map(row => row.RPS),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Average Response Time',
        data: data.map(row => row.avg_response_time),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Number of Users',
        data: data.map(row => row.number_of_users),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="result">
      <h1>Incremental Data</h1>
      <Line data={chartData} />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>test_id</th>
            <th>RPS</th>
            <th>Failures_per_second</th>
            <th>avg_response_time</th>
            <th>number_of_users</th>
            <th>recorded_time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.test_id}</td>
              <td>{row.RPS}</td>
              <td>{row.Failures_per_second}</td>
              <td>{row.avg_response_time}</td>
              <td>{row.number_of_users}</td>
              <td>{new Date(row.recorded_time).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
