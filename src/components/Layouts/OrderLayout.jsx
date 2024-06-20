import { useState } from "react";
import BadgeStatus from "../Fragments/BadgeStatus";
import CardOrder from "../Fragments/Card/CardOrder";
import useOrder from "../../hooks/useOrder";
import { useEffect } from "react";

const OrderLayout = () => {
  const initialBadgeData = [
    { text: "Semua", color: "secondary", value: "all" },
    { text: "Dalam Proses", color: "primary", value: "onProccess" },
    { text: "Menunggu Pembayaran", color: "primary", value: "waitingPayment" },
    { text: "Selesai", color: "primary", value: "finished" },
  ];

  const [badgeData, setBadgeData] = useState(initialBadgeData);
  // const [filter, setFilter] = useState("all");

  const { order, getAllOrderData } = useOrder();

  useEffect(() => {
    getAllOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="w-full h-full">
      <BadgeStatus
        data={badgeData}
        isClickable={true}
        onBadgeChange={onBadgeChange}
      />
      <div className="mt-4 grid gap-4">
        {order.map((item) => (
          <CardOrder key={item._id} order={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderLayout;
