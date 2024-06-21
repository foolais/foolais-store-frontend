/* eslint-disable react/prop-types */
import useOrder from "../../../hooks/useOrder";
import { formatDates, warningDialog } from "../../../utils/utils";
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
    <div className="w-full p-4 bg-white shadow-md rounded-lg border-[1px] border-secondary grid sm:max-w-[80%]">
      <div className="w-full flex items-center justify-between">
        <p className="font-bold text-md md:text-2xl">{`Pesanan : #${order.number_order}`}</p>
        <p className="font-bold text-sm">{`${
          order?.is_finished ? "Selesai" : "Dalam Proses"
        }`}</p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="font-semibold text-md md:text-lg my-1">{`Meja : ${order.table.name}`}</p>
        <p className="text-right text-sm md:text-md">
          {formatDates(order?.timestamps?.created_at)}
        </p>
      </div>
      <Button
        onClick={() => handleClickDetails(order._id)}
        className="btn-sm bg-secondary justify-self-end mt-4"
      >
        Lihat Detail
      </Button>
    </div>
  );
};

export default CardOrder;
