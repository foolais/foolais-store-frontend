/* eslint-disable react/prop-types */
import { AiOutlineDelete, AiOutlineEdit, AiOutlineRight } from "react-icons/ai";
import Button from "../../Elements/Button/Button";
import Card from "../Card";

const CardTable = (props) => {
  const { item, onClickEdit, onDeleteTable, onAddOrder } = props;

  const setStatus = (status) => {
    switch (status) {
      case "empty":
        return "Kosong";
      case "waiting":
        return "Menunggu";
      case "eating":
        return "Makan";
      case "finished":
        return "Selesai";
      default:
        return "Kosong";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "empty":
        return "bg-success";
      case "waiting":
        return "bg-warning";
      case "eating":
        return "bg-info";
      case "finished":
        return "bg-primary";
      default:
        return "bg-success";
    }
  };

  const setType = (type) => {
    switch (type) {
      case "dine_in":
        return "Makan Ditempat";
      case "take_away":
        return "Dibawa Pulang";
      default:
        return "Makan Ditempat";
    }
  };

  return (
    <Card
      className={`cursor-pointer hover:scale-105 duration-300 border-[1px] ${
        item.category === "custom" ? " border-primary" : "border-secondary"
      }`}
    >
      <div className="card-body">
        {/* TOP */}
        <div className="flex items-start justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* name */}
            <Card.Title title={item.name} className="font-semibold" />
            {/* Status Tooltip  */}
            <div
              className="tooltip tooltip-right"
              data-tip={setStatus(item.status)}
            >
              <div
                className={`w-4 h-4 rounded-full ${statusColor(item.status)}`}
              />
            </div>
          </div>
          {/* RIGTH */}
          <Button
            className="btn-circle btn-outline btn-sm btn-error"
            onClick={onDeleteTable}
          >
            <AiOutlineDelete />
          </Button>
        </div>
        {/* MID */}
        <p className="text-sm font-semibold mb-6">
          {" "}
          {` Tipe : ${setType(item.type)}`}
        </p>
        {/* BOTTOM */}
        <div className="card-actions justify-between">
          <div className="tooltip tooltip-top" data-tip="Edit">
            <Button
              className="btn-sm btn-circle btn-ghost"
              onClick={onClickEdit}
            >
              <AiOutlineEdit size={20} />
            </Button>
          </div>
          <Button
            className="btn-sm bg-secondary text-neutral"
            onClick={onAddOrder}
          >
            <span>Buat Pesanan</span>
            <AiOutlineRight size={15} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardTable;
