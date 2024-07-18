import { useState } from "react";
import BadgeStatus from "../Fragments/BadgeStatus";
import CardOrder from "../Fragments/Card/CardOrder";
import useOrder from "../../hooks/useOrder";
import { useEffect } from "react";
import Skeleton from "../Fragments/Skeleton/Skeleton";

const OrderLayout = () => {
  const initialBadgeData = [
    { text: "Semua", color: "secondary", value: "all" },
    { text: "Dalam Proses", color: "primary", value: "onProccess" },
    { text: "Selesai", color: "primary", value: "finished" },
  ];

  const [badgeData, setBadgeData] = useState(initialBadgeData);
  // const [filter, setFilter] = useState("all");

  const { order, loading, getAllOrderData } = useOrder();

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
      {order && !loading && (
        <BadgeStatus
          data={badgeData}
          isClickable={true}
          onBadgeChange={onBadgeChange}
          isWithCircleIcon={true}
          type="order"
        />
      )}
      <div className="mt-4 grid gap-4">
        {!order && !loading ? (
          <div className="w-full flex items-center justify-center text-primary p-4 font-semibold">
            Tidak Ada Pesanan
          </div>
        ) : loading ? (
          <Skeleton.List total={3} className="w-[80%] md:w-full h-32" />
        ) : (
          order?.map((item) => <CardOrder key={item._id} order={item} />)
        )}
      </div>
    </div>
  );
};

export default OrderLayout;
