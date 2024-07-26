/* eslint-disable react-hooks/exhaustive-deps */
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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEaringPerMonth } from "../../redux/slice/overviewSlice";
import { getCurrentDate } from "../../utils/utils";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const ChartOverview = () => {
  const dispatch = useDispatch();

  const [earningsData, setEarningsData] = useState([0, 0, 0, 0, 0]);
  const { data, loading } = useSelector((state) => state.overview);

  const chartData = {
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5"],
    datasets: [
      {
        label: "Pendapatan",
        data: earningsData,
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

  useEffect(() => {
    getEarningsData();
  }, []);

  useEffect(() => {
    if (data) {
      const { earningPerMonth } = data;
      setEarningsData(earningPerMonth);
    }
  }, [data]);

  const getEarningsData = () => {
    if (loading) return;
    try {
      dispatch(getEaringPerMonth());
    } catch (error) {
      setEarningsData([]);
    }
  };

  return (
    <div className="mt-8 xl:w-full xl:max-w-3/4">
      <h2 className="text-xl font-semibold tracking-wider my-4 text-center md:text-left">
        Pendapatan di Bulan {getCurrentDate()}
      </h2>
      <div className="w-full h-full lg:h-[60vh] xl:w-auto xl:h-[60vh]">
        {!loading && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default ChartOverview;
