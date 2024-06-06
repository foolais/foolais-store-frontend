import useBadge from "../../../hooks/useBadge";
import useOrder from "../../../hooks/useOrder";
import Button from "../../Elements/Button/Button";
import BadgeStatus from "../../Fragments/BadgeStatus";
import FooterLayout from "../../Fragments/Footer/FooterLayout";

const FooterOrderDetails = () => {
  const initialBadge = [
    { text: "Tunai", color: "secondary", value: "cash" },
    { text: "QRIS", color: "primary", value: "qris" },
  ];

  const { onEdit } = useOrder();

  const { badgeData, onBadgeChange } = useBadge(initialBadge);

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
          Total Harga : Rp. 200.000
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
