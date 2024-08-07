/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useBadge from "../../../hooks/useBadge";
import useOrder from "../../../hooks/useOrder";
import {
  formatRupiah,
  isLessThanOneDay,
  warningDialog,
} from "../../../utils/utils";
import Button from "../../Elements/Button/Button";
import BadgeStatus from "../BadgeStatus";
import FooterLayout from "./FooterLayout";
import PaymentModal from "../Modal/PaymentModal";
import { useSelector } from "react-redux";

const FooterOrderDetails = ({ order }) => {
  const { total_price: totalPrice, is_finished } = order;
  const initialBadge = [
    { text: "Tunai", color: "secondary", value: "cash" },
    { text: "QRIS", color: "primary", value: "qris" },
  ];
  const isValidAction = isLessThanOneDay(order?.timestamps?.created_at);

  const { onEdit, onSetTotalPrice, onFinishOrder } = useOrder();
  const { badgeData, badgeValue, onBadgeChange } = useBadge(initialBadge);
  const { showModalPayment, setShowModalPayment } = useOrder();

  const { singleOrder, loading } = useSelector((state) => state.order);

  const handlePayment = () => {
    const validate = validateServedMenu();
    if (validate) {
      warningDialog("Menu harus disajikan semua");
    } else {
      setShowModalPayment(true);
    }
  };

  const calculateTotalPrice = () => {
    const total = singleOrder?.menu?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total;
  };

  useEffect(() => {
    onSetTotalPrice(calculateTotalPrice(), "order");
  }, [singleOrder.menu]);

  useEffect(() => {
    if (!loading) onBadgeChange(singleOrder?.payment_method);
  }, [loading]);

  const validateServedMenu = () => {
    const { menu } = singleOrder;
    const notServed = menu?.filter((menu) => !menu?.is_served);
    return notServed?.length > 0;
  };

  return (
    <>
      <FooterLayout>
        <p className="font-bold md:text-lg">Metode Pembayaran</p>
        <BadgeStatus
          data={badgeData}
          isClickable={!onEdit && isValidAction && !is_finished}
          onBadgeChange={onBadgeChange}
        />
        <p className="md:text-lg text-right mb-3">
          Total Harga :{" "}
          <span className="font-semibold"> {formatRupiah(totalPrice)} </span>
        </p>
        <Button
          disabled={onEdit}
          onClick={handlePayment}
          className="bg-secondary w-full text-lg text-white"
        >
          {isValidAction && !is_finished
            ? "Bayar Sekarang"
            : "Detail Pembayaran"}
        </Button>
      </FooterLayout>
      {showModalPayment && (
        <PaymentModal
          showModal={() => setShowModalPayment(true)}
          closeModal={() => setShowModalPayment(false)}
          type={badgeValue}
          onSubmit={(event) => onFinishOrder(event, singleOrder)}
        />
      )}
    </>
  );
};

export default FooterOrderDetails;
