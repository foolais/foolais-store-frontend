import { useState } from "react";
import BadgeStatus from "./BadgeStatus";
import CardCart from "./Card/CardCart";
import CardAddNew from "./CardAddNew";
import Button from "../Elements/Button/Button";

const OrderDetails = () => {
  const dummyData = [
    {
      id: 1,
      name: "Soto",
      price: 12000,
      quantity: 2,
      is_selected: false,
    },
    {
      id: 2,
      name: "Bakso",
      price: 12000,
      quantity: 2,
      is_selected: false,
    },
  ];

  const initialBadgeData = [
    { text: "Tunai", color: "secondary", value: "cash" },
    { text: "QRIS", color: "primary", value: "qris" },
  ];

  const [badgeData, setBadgeData] = useState(initialBadgeData);

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
    <>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="font-bold text-2xl mb-1">Pesanan #1</p>
          <p>Status: Selesai</p>
        </div>
        <div>
          <p className="font-semibold text-lg">Meja : 2</p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4 mb-6 gap-4">
        <CardAddNew
          title="Tambah Pesanan Baru"
          cardClassName="min-h-auto min-w-48"
          titleClassName="font-semibold mt-10"
          actionClassName="mt-4"
        />
        {dummyData &&
          dummyData.map((item) => {
            return <CardCart key={item.id} item={item} />;
          })}
      </div>
      <div className="my-4 bg-white p-4 rounded-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold text-lg">Metode Pembayaran</p>
            <BadgeStatus
              data={badgeData}
              isClickable={true}
              onBadgeChange={onBadgeChange}
            />
          </div>
          <p className="font-semibold text-lg text-right">
            Total Harga : Rp. 200.000
          </p>
        </div>
        <Button className="bg-secondary w-full mt-4 text-lg text-white">
          Bayar Sekarang
        </Button>
      </div>
    </>
  );
};

export default OrderDetails;
