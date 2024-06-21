/* eslint-disable react/prop-types */
import { AiOutlineDelete, AiOutlineEdit, AiOutlineRight } from "react-icons/ai";
import Button from "../../Elements/Button/Button";
import Card from "../Card/Card";
import {
  setColorTable,
  setStatusTable,
  setTypeTable,
} from "../../../utils/statusData";
import useTable from "../../../hooks/useTable";

const CardTable = (props) => {
  const { item, onClickEdit, onDeleteTable, onAddOrder } = props;

  const { isEmptyStatusOrderTable } = useTable();

  return (
    <Card
      className={`cursor-pointer hover:scale-105 duration-300 border-[1px] min-w-48 min-h-24 md:min-h-36 ${
        item.category === "custom" ? " border-primary" : "border-secondary"
      }`}
    >
      <div className="card-body">
        {/* TOP */}
        <div className="flex items-start justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* name */}
            <Card.Title
              title={item.name}
              className="font-semibold text-[1rem] md:text-md"
            />
            {/* Status Tooltip  */}
            <div
              className="tooltip tooltip-right"
              data-tip={setStatusTable(item.status)}
            >
              <div
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${setColorTable(
                  item.status
                )}`}
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
        <p className="text-sm font-semibold mb-2 md:mb-6">
          {" "}
          {` Tipe : ${setTypeTable(item.type)}`}
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
            <span>{`${
              isEmptyStatusOrderTable(item.status) ? "Buat" : "Lihat"
            } Pesanan`}</span>
            <AiOutlineRight size={15} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardTable;
