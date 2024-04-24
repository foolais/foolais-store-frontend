/* eslint-disable react/prop-types */
import { AiOutlineEdit, AiOutlineRight } from "react-icons/ai";
import Button from "../Elements/Button/Button";
import { useSelector } from "react-redux";
import {
  getCartData,
  getCartStatus,
  getCartTable,
} from "../../redux/slice/cartSlice";
import { formatRupiah } from "../../utils/utils";
import { useState, useEffect } from "react";
import ModalPayment from "../Fragments/Modal/ModalPayment";

const FooterCartAction = () => {
  const [cartTable, setCartTable] = useState(null);
  const [showModalPayment, setShowModalPayment] = useState(false);

  const cartData = useSelector(getCartData);
  const cartTableData = useSelector(getCartTable);
  const cartStatus = useSelector(getCartStatus);

  const calculateTotalPrice = () => {
    const totalPrice = cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return formatRupiah(totalPrice);
  };

  useEffect(() => {
    if (cartStatus === "idle") setCartTable(cartTableData);
  }, [cartStatus, cartTableData]);

  const onChangeTable = (type) => {
    if (type === "ADD") {
      console.log("ADD Table");
    } else if (type === "UPDATE") {
      console.log({ cartTable });
    }
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 h-28 bg-secondary ml-16 flex items-center justify-between p-4">
      {/* Title Name */}
      <div className="absolute -top-6 left-0 bg-primary py-2 px-4 rounded-r-md text-neutral font-semibold">
        Pesanan
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Select Meja */}
        <div className="flex items-center gap-4 text-neutral">
          <span className="font-semibold ">Meja : </span>
          {cartTable ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold">{cartTable?.name}</span>
              <Button
                className="btn-sm btn-circle btn-ghost"
                onClick={() => onChangeTable("UPDATE")}
              >
                <AiOutlineEdit size={18} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Pilih Meja</span>
              <Button
                className="btn-sm btn-circle btn-ghost"
                onClick={() => onChangeTable("ADD")}
              >
                <AiOutlineEdit size={18} />
              </Button>
            </div>
          )}
        </div>
        {/* Total Price */}
        <div className="text-neutral">
          <span className="font-semibold">Total Harga</span> :{" "}
          {calculateTotalPrice()}
        </div>
      </div>
      <div>
        {/* <Button className="bg-secondary text-neutral" onClick={onClick}>
          Buat Pesananan
          <AiCash size={15} />
        </Button> */}
        {/* Button Tambah pesanan */}
        <Button
          className="bg-secondary text-neutral"
          onClick={() => setShowModalPayment(true)}
        >
          Bayar
          <AiOutlineRight size={15} />
        </Button>
      </div>
      <ModalPayment
        showModal={showModalPayment}
        closeModal={() => setShowModalPayment(false)}
      />
    </div>
  );
};

export default FooterCartAction;
