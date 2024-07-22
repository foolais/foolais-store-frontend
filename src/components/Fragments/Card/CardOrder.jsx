/* eslint-disable react/prop-types */
import useOrder from "../../../hooks/useOrder";
import { formatDates, warningDialog } from "../../../utils/utils";
import Button from "../../Elements/Button/Button";
import { useNavigate } from "react-router-dom";

const CardOrder = ({ order }) => {
  const navigate = useNavigate();
  const { getSingleOrderData } = useOrder();

  const handleClickDetails = async (id) => {
    try {
      await getSingleOrderData(id, () => {
        navigate(`/pesanan/${id}`);
      });
    } catch (error) {
      warningDialog(error);
    }
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg border-[1px] border-secondary grid sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%]">
      <div className="w-full flex items-center justify-between">
        <p className="font-bold text-md md:text-2xl">{`Pesanan : #${order.number_order}`}</p>
        <div className="flex items-center justify-center gap-2">
          <p className="font-bold text-sm">{`${
            order?.is_finished ? "Selesai" : "Dalam Proses"
          }`}</p>
          <div
            className={`w-3 h-3 rounded-full ${
              order?.is_finished ? "bg-secondary" : "bg-warning"
            }`}
          />
        </div>
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
