/* eslint-disable react/prop-types */
import useOrder from "../../../hooks/useOrder";
import { formatDates, formatRupiah, warningDialog } from "../../../utils/utils";
import Button from "../../Elements/Button/Button";
import { useNavigate } from "react-router-dom";

const CardOrder = ({ order }) => {
  const navigate = useNavigate();
  const { getSingleOrderData } = useOrder();

  const handleClickDetails = (id) => {
    try {
      getSingleOrderData(id, () => {
        navigate(`/pesanan/${id}`);
      });
    } catch (error) {
      warningDialog(error);
    }
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg flex justify-between border-[1px] border-secondary">
      <div className="w-1/2">
        <p className="font-bold text-2xl">{`Pesanan : #${order.number_order}`}</p>
        <p className="font-semibold text-lg my-1">{`Meja : ${order.table.name}`}</p>
        <p className="font-semibold text-sm">{`Status: ${
          order?.is_finished ? "Selesai" : "Menunggu"
        }`}</p>
      </div>
      <div className="w-auto flex flex-col justify-end">
        <p className="text-right">
          {formatDates(order?.timestamps?.created_at)}
        </p>
        <p className="text-right font-semibold my-1">
          {formatRupiah(order.total_price)}
        </p>
        <Button
          onClick={() => handleClickDetails(order._id)}
          className="btn-sm bg-secondary"
        >
          Lihat Detail -
        </Button>
      </div>
    </div>
  );
};

export default CardOrder;
