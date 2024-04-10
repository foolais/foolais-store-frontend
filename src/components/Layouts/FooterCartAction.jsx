/* eslint-disable react/prop-types */
import { AiOutlineRight } from "react-icons/ai";
import Button from "../Elements/Button/Button";
import { useSelector } from "react-redux";
import { getCartData } from "../../redux/slice/cartSlice";
import { formatRupiah } from "../../utils/utils";

const FooterCartAction = ({ onClick }) => {
  const cartData = useSelector(getCartData);

  const calculateTotalPrice = () => {
    const totalPrice = cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    console.log(typeof totalPrice);
    console.log({ totalPrice });

    return formatRupiah(totalPrice);
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 h-28 bg-neutral ml-16 flex items-center justify-between p-4">
      {/* Title Name */}
      <div className="absolute -top-6 left-0 bg-accent py-2 px-4 rounded-r-md text-secondary font-semibold">
        Pesanan
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Select Meja */}
        <div className="flex items-center gap-4">
          <span className="font-semibold">Pilih Meja : </span>
          <select className="select select-bordered select-sm">
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
          </select>
        </div>
        {/* Total Price */}
        <div>
          <span className="font-semibold">Total Harga</span> :{" "}
          {calculateTotalPrice()}
        </div>
      </div>
      {/* Button */}
      <Button className="bg-accent text-secondary" onClick={onClick}>
        Buat Pesananan
        <AiOutlineRight size={15} />
      </Button>
    </div>
  );
};

export default FooterCartAction;
