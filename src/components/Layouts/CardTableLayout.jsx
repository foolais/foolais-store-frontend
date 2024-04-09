import { useSelector } from "react-redux";
import { getTableData, getTableStatus } from "../../redux/slice/tableSlice";
import { useState, useEffect } from "react";
import Card from "../Fragments/Card";
import Button from "../Elements/Button/Button";
import { AiOutlineRight, AiOutlineEdit } from "react-icons/ai";
import BadgeStatus from "../Fragments/BadgeStatus";

const CardTableLayout = () => {
  const [table, setTable] = useState(null);
  const tableData = useSelector(getTableData);
  const statusTable = useSelector(getTableStatus);

  const statusColor = (status) => {
    switch (status) {
      case "empty":
        return "bg-success";
      case "waiting":
        return "bg-warning";
      case "eating":
        return "bg-info";
      case "finished":
        return "bg-accent";
      default:
        return "bg-success";
    }
  };

  const statusData = [
    { text: "Kosong", color: "success" },
    { text: "Menunggu", color: "warning" },
    { text: "Makan", color: "info" },
    { text: "Selesai", color: "accent" },
  ];

  useEffect(() => {
    if (statusTable === "idle") setTable(tableData);
  }, [statusTable, tableData]);

  return (
    <div className="w-full h-auto">
      {/* Status */}
      <div className="flex items-center text-neutral gap-4 mb-2">
        <p>Status Meja : </p>
        <BadgeStatus data={statusData} />
      </div>
      {/* Daftar Meja */}
      <div className="flex items-center justify-around sm:justify-between flex-wrap gap-8">
        {table && table.length > 0 ? (
          table.map((item) => {
            return (
              <Card
                key={item._id}
                className="cursor-pointer hover:scale-105 duration-300"
              >
                {/* Card Body */}
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    {/* name */}
                    <Card.Title
                      title={`Meja ${item.name}`}
                      className="font-semibold "
                    />
                    {/* Tooltip */}
                    <div
                      className="tooltip tooltip-left"
                      data-tip={item.status}
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${statusColor(
                          item.status
                        )}`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-6">{`Kategori : ${item.category}`}</p>
                  {/* Button action */}
                  <div className="card-actions justify-between ">
                    <div className="tooltip tooltip-top" data-tip="Edit">
                      <Button className="btn-sm btn-circle btn-ghost">
                        <AiOutlineEdit size={20} />
                      </Button>
                    </div>
                    <Button className="btn-sm bg-secondary text-neutral">
                      <span>Buat Pesanan</span>
                      <AiOutlineRight size={15} />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="w-full flex items-center justify-center text-neutral p-4 font-semibold">
            Tidak ada Data Meja
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTableLayout;
