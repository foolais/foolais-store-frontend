/* eslint-disable react-hooks/exhaustive-deps */
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
  const [filteredOrder, setFilteredOrder] = useState([]);

  const { order, loading, getAllOrderData } = useOrder();

  useEffect(() => {
    const fetchAndFilterOrders = async () => {
      if (order) {
        await filterOrders();
      }
    };
    fetchAndFilterOrders();
  }, [order, badgeData]);

  useEffect(() => {
    getAllOrderData();
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

  const getBadgeValue = () => {
    const data = badgeData.find((item) => item.color === "secondary");
    return data.value;
  };

  const filterOrders = () => {
    const badgeValue = getBadgeValue();
    const isBadgeValueFinished = badgeValue === "finished";
    const updatedFilteredOrder =
      badgeValue === "all"
        ? order
        : order.filter((item) => item.is_finished === isBadgeValueFinished);
    setFilteredOrder(updatedFilteredOrder);
  };

  return (
    <div className="w-full h-full">
      {filteredOrder && !loading && (
        <BadgeStatus
          data={badgeData}
          isClickable={true}
          onBadgeChange={onBadgeChange}
          isWithCircleIcon={true}
          type="order"
        />
      )}
      <div className="mt-4 grid gap-4">
        {filteredOrder.length === 0 && !loading ? (
          <div className="w-full flex items-center justify-center text-primary p-4 font-semibold">
            Tidak Ada Pesanan
          </div>
        ) : loading ? (
          <Skeleton.List total={3} className="w-[80%] md:w-full h-32" />
        ) : (
          filteredOrder?.map((item) => (
            <CardOrder key={item._id} order={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderLayout;
