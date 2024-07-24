import CardStats from "../Fragments/Card/CardStats";
import sidenavData from "../../utils/sidenavData";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";

const DashboardStatsCard = () => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const updatedData = sidenavData
      .map((item) => {
        const acceptedData = ["menu", "meja", "pesanan"];
        if (acceptedData.includes(item.title.toLocaleLowerCase())) {
          return {
            text: item.title,
            value: 1000,
            icon: item.icon,
          };
        }
      })
      .filter((item) => item);

    updatedData.push({
      text: "Pendapatan",
      value: 1000,
      icon: <AiOutlineMoneyCollect size={20} />,
    });

    setStatsData(updatedData);
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold tracking-wider text-center md:text-left">
        Warung Soto Bakso Hanna
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {statsData &&
          statsData.map((item) => {
            return <CardStats key={item.text} data={item} />;
          })}
      </div>
    </div>
  );
};

export default DashboardStatsCard;
