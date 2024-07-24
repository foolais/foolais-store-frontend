import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const ChartOverview = () => {
  const data = {
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5"],
    datasets: [
      {
        label: "Pendapatan",
        data: [400000, 30000, 35000, 44000, 50000],
        fill: true,
        backgroundColor: "#49beaa60",
        borderColor: "#49beaa",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold tracking-wider my-4 text-center md:text-left">
        Pendapatan Bulan Juni
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartOverview;
