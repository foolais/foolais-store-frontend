/* eslint-disable react-hooks/exhaustive-deps */
import CardStats from "../Fragments/Card/CardStats";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOverview } from "../../redux/slice/overviewSlice";
import {
  AiFillMoneyCollect,
  AiOutlineAppstore,
  AiOutlineOrderedList,
  AiOutlineTable,
} from "react-icons/ai";

const DashboardStatsCard = () => {
  const dispatch = useDispatch();

  const [statsData, setStatsData] = useState([]);
  const { data, loading } = useSelector((state) => state.overview);

  useEffect(() => {
    getOverviewData();
  }, []);

  useEffect(() => {
    if (data) {
      const { totalMenu, totalTable, totalOrder, totalEarnings } = data;
      const payload = [
        {
          text: "Total Menu",
          value: totalMenu,
          icon: <AiOutlineAppstore size={30} />,
        },
        {
          text: "Total Meja",
          value: totalTable,
          icon: <AiOutlineTable size={30} />,
        },
        {
          text: "Total Pesanan",
          value: totalOrder,
          icon: <AiOutlineOrderedList size={30} />,
        },
        {
          text: "Total Pendapatan",
          value: totalEarnings,
          icon: <AiFillMoneyCollect size={30} />,
        },
      ];

      setStatsData(payload);
    }
  }, [data]);

  const getOverviewData = () => {
    if (loading) return;
    try {
      dispatch(getAllOverview());
    } catch (error) {
      setStatsData([]);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold tracking-wider text-center md:text-left">
        Warung Soto Bakso Hanna
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {!loading &&
          statsData &&
          statsData.map((item) => {
            return <CardStats key={item?.text} data={item} />;
          })}
      </div>
    </div>
  );
};

export default DashboardStatsCard;
