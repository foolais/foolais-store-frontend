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
          Total Harga : {formatRupiah(totalPrice)}
        </p>
      </div>
      <Button
        disabled={onEdit}
        className="bg-secondary w-full mt-4 text-lg text-white"
      >
        Bayar Sekarang
      </Button>
    </FooterLayout>
  );
};

export default FooterOrderDetails;
