import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RevenueChart = ({ dataPoints = [] }) => {
  const data = {
    labels: dataPoints.map((item) => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: dataPoints.map((item) => item.revenue),
        backgroundColor: '#0891b2'
      }
    ]
  };

  return <Bar data={data} />;
};

export default RevenueChart;
