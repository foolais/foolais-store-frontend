/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useBadge from "../../../hooks/useBadge";
import useOrder from "../../../hooks/useOrder";
import { formatRupiah } from "../../../utils/utils";
import Button from "../../Elements/Button/Button";
import BadgeStatus from "../BadgeStatus";
import FooterLayout from "./FooterLayout";

const FooterOrderDetails = ({ totalPrice }) => {
  const initialBadge = [
    { text: "Tunai", color: "secondary", value: "cash" },
    { text: "QRIS", color: "primary", value: "qris" },
  ];

  const { onEdit, onChangePayment } = useOrder();

  const { badgeData, badgeValue, onBadgeChange } = useBadge(initialBadge);

  useEffect(() => {
    onBadgeChange(badgeValue);
    onChangePayment(badgeValue);
  }, [badgeValue]);

  return (
    <FooterLayout>
      <p className="font-bold md:text-lg">Metode Pembayaran</p>
      <BadgeStatus
        data={badgeData}
        isClickable={!onEdit}
        onBadgeChange={onBadgeChange}
      />
      <p className="md:text-lg text-right mb-3">
        Total Harga :{" "}
        <span className="font-semibold"> {formatRupiah(totalPrice)} </span>
      </p>
      <Button
        disabled={onEdit}
        className="bg-secondary w-full text-lg text-white"
      >
        Bayar Sekarang
      </Button>
    </FooterLayout>
  );
};

export default FooterOrderDetails;
