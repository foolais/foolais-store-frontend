import { useState } from "react";
import { AiOutlineEdit, AiOutlineFileAdd } from "react-icons/ai";
import Button from "../Elements/Button/Button";
import CardAddNew from "../Fragments/CardAddNew";
import CardCart from "../Fragments/Card/CardCart";
import BadgeStatus from "../Fragments/BadgeStatus";

const OrderDetailsLayout = () => {
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
  const [onEdit, setOnEdit] = useState(false);

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
          <div className="flex items-center">
            <p className="font-bold text-2xl mb-1">Pesanan #1</p>
            <div
              className="tooltip tooltip-right"
              data-tip={onEdit ? "Simpan Perubahan" : "Edit Pesanan"}
            >
              <Button
                onClick={() => setOnEdit((prev) => !prev)}
                className="btn-sm btn-circle btn-ghost"
              >
                {onEdit ? (
                  <AiOutlineFileAdd size={20} />
                ) : (
                  <AiOutlineEdit size={20} />
                )}
              </Button>
            </div>
          </div>
          <p>Status: Selesai</p>
        </div>
        <div>
          <p className="font-semibold text-lg">Meja : 2</p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4 gap-4">
        {dummyData &&
          dummyData.map((item) => {
            return (
              <CardCart key={item.id} item={item} isDisabledAction={!onEdit} />
            );
          })}
        <CardAddNew
          title="Tambah Pesanan Baru"
          cardClassName={`min-h-auto h-40 min-w-48 ${
            onEdit ? "mb-52" : "mb-0"
          }`}
          titleClassName="font-semibold mt-10"
          actionClassName="mt-4"
          onEdit={!onEdit}
        />
      </div>
      <div className="my-4 bg-white p-4 rounded-lg fixed bottom-0 left-4 right-4 ml-16 shadow-lg border-[1px] border-secondary">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold text-lg">Metode Pembayaran</p>
            <BadgeStatus
              data={badgeData}
              isClickable={!onEdit}
              onBadgeChange={onBadgeChange}
            />
          </div>
          <p className="font-semibold text-lg text-right">
            Total Harga : Rp. 200.000
          </p>
        </div>
        <Button
          disabled={onEdit}
          className="bg-secondary w-full mt-4 text-lg text-white"
        >
          Bayar Sekarang
        </Button>
      </div>
    </>
  );
};

export default OrderDetailsLayout;
