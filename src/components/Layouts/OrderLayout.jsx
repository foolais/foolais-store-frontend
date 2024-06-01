import { useState } from "react";
import BadgeStatus from "../Fragments/BadgeStatus";
import CardOrder from "../Fragments/Card/CardOrder";
import OrderDetails from "../Fragments/OrderDetails";

const OrderLayout = () => {
  const initialBadgeData = [
    { text: "Semua", color: "secondary", value: "all" },
    { text: "Sedang Dalam Proses", color: "primary", value: "onProccess" },
    { text: "Selesai", color: "primary", value: "finished" },
  ];

  const [badgeData, setBadgeData] = useState(initialBadgeData);
  const [filter, setFilter] = useState("all");

  const onBadgeChange = (value) => {
    const updateBadgeData = badgeData.map((item) => {
      return {
        ...item,
        color: item.value === value ? "secondary" : "primary",
      };
    });

    setBadgeData(updateBadgeData);
  };

  return (
    <div className="w-full h-auto">
      <BadgeStatus
        data={badgeData}
        isClickable={true}
        onBadgeChange={onBadgeChange}
      />
      <div className="my-4 grid gap-4">
        <CardOrder />
        <CardOrder />
      </div>
      <div className="mt-4 w-full h-auto">
        <OrderDetails />
      </div>
    </div>
  );
};

export default OrderLayout;
