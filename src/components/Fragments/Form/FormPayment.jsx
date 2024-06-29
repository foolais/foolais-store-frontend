/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";
import { formatRupiah } from "../../../utils/utils";
import BadgeStatus from "../BadgeStatus";
import { LazyLoadImage } from "react-lazy-load-image-component";
import QRIS from "../../../assets/qris.png";
import { debounce } from "lodash";
import useOrder from "../../../hooks/useOrder";

/* eslint-disable react/prop-types */
const FormPayment = (props) => {
  const { onSubmit, type = "cash" } = props;

  const { setTypePayment } = useOrder();

  const {
    total_price: totalPrice,
    total_paid: totalPaid,
    is_finished: isFinished,
  } = useSelector((state) => state.order.singleOrder);

  const badgeMoneyData = React.useMemo(() => {
    const badges = [
      { text: "Uang Pas", color: "secondary", value: totalPrice },
    ];
    const ceilToNearest = (num, multiple) => {
      return Math.ceil(num / multiple) * multiple;
    };
    const ceilTotalPrice = ceilToNearest(totalPrice, 5000);

    if (totalPrice !== ceilTotalPrice) {
      badges.push({
        text: formatRupiah(ceilTotalPrice),
        color: "primary",
        value: ceilTotalPrice,
      });
    }

    const numberWithoutZero = totalPrice.toString().replace(/0+$/, "");
    const isOddMultipleOf5000 =
      totalPrice % 5000 === 0 && +numberWithoutZero % 2 !== 0;

    if (isOddMultipleOf5000) {
      badges.push({
        text: formatRupiah(totalPrice + 5000),
        color: "primary",
        value: totalPrice + 5000,
      });
    }

    const thresholds = [50000, 100000, 150000, 200000, 250000];
    const newBadges = thresholds.find((value) => value >= totalPrice);
    if (newBadges) {
      badges.push({
        text: formatRupiah(newBadges),
        color: "primary",
        value: newBadges,
      });
    }

    return badges;
  }, [totalPrice]);

  const badgeTypeData = React.useMemo(
    () => [
      {
        text: "Uang Tunai",
        color: type === "cash" ? "secondary" : "primary",
        value: "cash",
      },
      {
        text: "QRIS",
        color: type === "qris" ? "secondary" : "primary",
        value: "qris",
      },
    ],
    [type]
  );

  const [badgeMoney, setBadgeMoney] = useState(badgeMoneyData);
  const [badgeType, setBadgeType] = useState(badgeTypeData);
  const [isCash, setIsCash] = useState(type === "cash");
  const [totalPayment, setTotalPayment] = useState(
    isFinished ? totalPaid : totalPrice
  );

  const onBadgeChange = (value) => {
    if (typeof value === "number") {
      setBadgeMoney((prev) =>
        prev.map((item) => ({
          ...item,
          color: item.value === value ? "secondary" : "primary",
        }))
      );
      setTotalPayment(value);
    } else {
      setBadgeType((prev) =>
        prev.map((item) => ({
          ...item,
          color: item.value === value ? "secondary" : "primary",
        }))
      );

      setTypePayment(value);
      setIsCash(value === "cash");
    }
  };

  const onSetSelectedMoneyBadge = debounce(() => {
    const badgesValue = badgeMoney?.map((item) => item.value);
    if (!badgesValue?.includes(+totalPayment)) {
      setBadgeMoney((prev) =>
        prev.map((item) => ({
          ...item,
          color: "primary",
        }))
      );
    } else {
      setBadgeMoney((prev) =>
        prev.map((item) => ({
          ...item,
          color: item.value === +totalPayment ? "secondary" : "primary",
        }))
      );
    }
  }, 650);

  useEffect(() => {
    onSetSelectedMoneyBadge();
    return () => {
      onSetSelectedMoneyBadge.cancel();
    };
  }, [totalPayment]);

  useEffect(() => {
    const badges = badgeType.find((item) => item.color === "secondary");
    if (badges) {
      setTypePayment(badges.value);
    }
  }, [badgeType]);

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2 md:mb-4 flex items-center gap-4">
        <p className="text-sm md:text-md">Tipe Pembayaran : </p>
        <BadgeStatus
          data={badgeType}
          isClickable={true}
          onBadgeChange={onBadgeChange}
        />
      </div>
      {isCash ? (
        <>
          <FormInput
            title="Total Harga"
            type="number"
            name="total_price"
            isInput={true}
            isDisabled={true}
            defaultValue={totalPrice}
          />
          <FormInput
            title="Total Bayar"
            type="number"
            name="total_paid"
            isInput={true}
            value={totalPayment}
            onChange={(e) => setTotalPayment(e.target.value)}
          />
          <div className="mt-4">
            <BadgeStatus
              data={badgeMoney}
              isClickable={true}
              onBadgeChange={onBadgeChange}
            />
          </div>
          <FormInput
            title="Total Kembalian"
            type="number"
            name="number"
            isInput={true}
            isDisabled={true}
            value={totalPayment - totalPrice}
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4 font-semibold">
            Total Harga : {formatRupiah(totalPrice)}
          </div>
          <div className="w-full flex items-center justify-center">
            <LazyLoadImage src={QRIS} width={250} height={250} alt="qris" />
          </div>
        </>
      )}
      <Button
        className="bg-secondary text-white mt-4 w-full"
        disabled={totalPayment < totalPrice}
      >
        Selesaikan Pesanan
      </Button>
    </form>
  );
};

export default FormPayment;
