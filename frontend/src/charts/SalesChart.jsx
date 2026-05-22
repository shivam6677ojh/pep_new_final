import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const SalesChart = ({ products = [] }) => {
  const data = {
    labels: products.map((item) => item.title),
    datasets: [
      {
        label: 'Units Sold',
        data: products.map((item) => item.sales),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        tension: 0.3
      }
    ]
  };

  return <Line data={data} />;
};

export default SalesChart;
