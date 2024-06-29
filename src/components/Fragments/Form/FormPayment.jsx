import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";
import { formatRupiah } from "../../../utils/utils";
import BadgeStatus from "../BadgeStatus";
import { LazyLoadImage } from "react-lazy-load-image-component";
import QRIS from "../../../assets/qris.png";

/* eslint-disable react/prop-types */
const FormPayment = (props) => {
  const { onSubmit, type = "cash" } = props;

  const { totalPrice } = useSelector((state) => state.cart);

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

    const thresholds = [100000, 150000, 200000, 250000];
    thresholds.forEach((value) => {
      if (value <= totalPrice) {
        badges.push({
          text: formatRupiah(value),
          color: "primary",
          value: value,
        });
      }
    });

    if (totalPrice <= 50000) {
      badges.push({
        text: formatRupiah(50000),
        color: "primary",
        value: 50000,
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
  const [totalPayment, setTotalPayment] = useState(totalPrice);

  const onBadgeChange = (value) => {
    console.log(typeof value === "number");
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

      setIsCash(value === "cash");
    }
  };

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
            name="number"
            isInput={true}
            isDisabled={true}
            defaultValue={totalPrice}
          />
          <FormInput
            title="Total Bayar"
            type="number"
            name="number"
            isInput={true}
            value={totalPayment}
            onChange={(e) => setTotalPayment(e.target.value)}
          />
          <FormInput
            title="Total Kembalian"
            type="number"
            name="number"
            isInput={true}
            isDisabled={true}
            value={totalPayment - totalPrice}
          />
          <div className="mt-4">
            <BadgeStatus
              data={badgeMoney}
              isClickable={true}
              onBadgeChange={onBadgeChange}
            />
          </div>
          <Button className="bg-secondary text-white mt-4 w-full">
            Bayar Sekarang
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4 font-semibold">
            Total Harga : {formatRupiah(totalPrice)}
          </div>
          <div className="w-full flex items-center justify-center">
            <LazyLoadImage src={QRIS} width={250} height={250} alt="qris" />
          </div>
          <Button className="bg-secondary text-white mt-4 w-full">
            Selesai
          </Button>
        </>
      )}
    </form>
  );
};

export default FormPayment;
