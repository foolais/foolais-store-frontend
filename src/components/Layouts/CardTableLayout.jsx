import { useSelector, useDispatch } from "react-redux";
import {
  getTableData,
  getTableStatus,
  handleAddTable,
  handleDeleteTable,
  handleUpdateTable,
} from "../../redux/slice/tableSlice";
import { useState, useEffect } from "react";
import Card from "../Fragments/Card";
import Button from "../Elements/Button/Button";
import { AiOutlineRight, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import BadgeStatus from "../Fragments/BadgeStatus";
import CardAddNew from "../Fragments/CardAddNew";
import Modal from "../Fragments/Modal";
import FormTable from "../Fragments/Form/FormTable";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  warningDialog,
} from "../../utils/utils";
import { handleSetTableCart } from "../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";

const CardTableLayout = () => {
  const [table, setTable] = useState(null);
  const [addTableModal, setAddTableModal] = useState(false);
  const [editTableModal, setEditTableModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const setType = (type) => {
    switch (type) {
      case "dine_in":
        return "Makan Ditempat";
      case "take_away":
        return "Bawa Pulang";
      default:
        return "Makan Ditempat";
    }
  };

  useEffect(() => {
    if (statusTable === "idle") setTable(tableData);
  }, [statusTable, tableData]);

  // Validate Table
  const isValidateTable = (table, type) => {
    if (type === "ADD") return table?.name && table?.category;
    if (type === "UPDATE")
      return table?.name && table?.category && table?.status;
    return false;
  };

  // Click Edit Table
  const onClickEdit = (data) => {
    setEditTableModal(true);
    setSelectedTable(data);
  };

  // Create Table Card
  const onAddTable = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const validate = isValidateTable(data, "ADD");

    if (validate) {
      dispatch(handleAddTable(data));
      setAddTableModal(false);
    } else {
      warningDialog("Tidak boleh ada data yang kosong");
    }
  };

  // Update Table Card
  const onUpdateTable = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const validate = isValidateTable(data, "UPDATE");

    const updatedTable = {
      ...data,
      _id: selectedTable?._id,
    };

    if (validate) {
      dispatch(handleUpdateTable(updatedTable));
      setEditTableModal(false);
    } else {
      alert("Tidak boleh ada data yang kosong");
    }
  };

  // Delete Table Card
  const onDeleteTable = ({ _id, name }) => {
    const title = `Apakah anda yakin ingin menghapus meja ${name}?`;
    const successTitle = `Meja ${name} telah dihapus`;
    showConfirmationDialog(title, successTitle, (isConfirmed) => {
      isConfirmed && dispatch(handleDeleteTable(_id));
    });
  };

  const onCloseModal = (type) => {
    exitConfirmationDialog((isConfirmed) => {
      if (isConfirmed) {
        if (type === "ADD") setAddTableModal(false);
        if (type === "UPDATE") setEditTableModal(false);
      }
    });
  };

  const onAddOrder = (item) => {
    dispatch(handleSetTableCart(item));
    navigate("/menu");
  };

  return (
    <div className="w-full h-auto">
      {/* Status */}
      <div className="flex items-center text-neutral gap-4 mb-2">
        <p>Status Meja : </p>
        <BadgeStatus data={statusData} />
      </div>
      {/* Daftar Meja */}
      {table && table.length === 0 && (
        <div className="w-full flex items-center justify-center text-neutral p-4 font-semibold">
          Tidak ada Data Meja
        </div>
      )}
      <div className="flex items-center justify-around  flex-wrap gap-8">
        {table &&
          table.length > 0 &&
          table.map((item) => {
            return (
              <Card
                key={item._id}
                className="cursor-pointer hover:scale-105 duration-300"
              >
                {/* Card Body */}
                <div className="card-body">
                  {/* TOP */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* name */}
                      <Card.Title
                        title={item.name}
                        className="font-semibold "
                      />
                      {/* Status Tooltip  */}
                      <div
                        className="tooltip tooltip-right"
                        data-tip={setStatus(item.status)}
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${statusColor(
                            item.status
                          )}`}
                        ></div>
                      </div>
                    </div>
                    {/* Button Delete */}
                    <Button
                      className="btn-circle btn-outline btn-sm btn-error absolute right-4"
                      onClick={() => onDeleteTable(item)}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </div>
                  {/* Middle */}
                  <p className="text-sm font-semibold mb-6">{`Tipe : ${setType(
                    item.type
                  )}`}</p>
                  {/* Button action */}
                  <div className="card-actions justify-between ">
                    <div className="tooltip tooltip-top" data-tip="Edit">
                      <Button
                        className="btn-sm btn-circle btn-ghost"
                        onClick={() => onClickEdit(item)}
                      >
                        <AiOutlineEdit size={20} />
                      </Button>
                    </div>
                    <Button
                      className="btn-sm bg-secondary text-neutral"
                      onClick={() => onAddOrder(item)}
                    >
                      <span>Buat Pesanan</span>
                      <AiOutlineRight size={15} />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        {/* Add New Table Card */}
        <CardAddNew
          title="Tambah Meja Baru"
          cardClassName="min-h-40 max-h-40 justify-center"
          titleClassName="font-semibold"
          actionClassName="mt-4"
          btnOnClick={() => setAddTableModal(true)}
        />
        {/* Add New Table Modal */}
        <Modal
          title="Tambah Meja Baru"
          showModal={addTableModal}
          closeModal={() => onCloseModal("ADD")}
        >
          <FormTable
            onSubmit={(event) => onAddTable(event)}
            btnText="Tambah Meja"
          />
        </Modal>
        {/* Edit Table Modal */}
        <Modal
          key={selectedTable?._id}
          title={`Ubah Meja ${selectedTable?.name}`}
          showModal={editTableModal}
          closeModal={() => onCloseModal("UPDATE")}
        >
          <FormTable
            onSubmit={(event) => onUpdateTable(event)}
            btnText="Ubah Meja"
            defaultValue={selectedTable}
            isEdit={true}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CardTableLayout;
