import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryChart = ({ lowStockCount = 0, healthyStockCount = 0 }) => {
  const data = {
    labels: ['Low Stock', 'Healthy Stock'],
    datasets: [
      {
        data: [lowStockCount, healthyStockCount],
        backgroundColor: ['#fb7185', '#22c55e']
      }
    ]
  };

  return <Doughnut data={data} />;
};

export default InventoryChart;
