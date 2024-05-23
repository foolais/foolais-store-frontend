import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTable,
  handleAddTable,
  handleDeleteTable,
  handleUpdateTable,
} from "../redux/slice/tableSlice";
import { useNavigate } from "react-router-dom";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  warningDialog,
} from "../utils/utils";
import { handleSetTableCart } from "../redux/slice/cartSlice";

const useTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const [table, setTable] = useState(null);
  const [addTableModal, setAddTableModal] = useState(false);
  const [editTableModal, setEditTableModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  // Selector
  const { data: tableData, loading } = useSelector((state) => state.table);

  useEffect(() => {
    dispatch(getAllTable());
  }, [dispatch]);

  useEffect(() => {
    if (tableData && tableData.length > 0 && !loading) setTable(tableData);
  }, [tableData, loading]);

  // Validate Table
  const isValidateTable = (table, type) => {
    if (type === "ADD") return table?.name && table?.category;
    if (type === "UPDATE")
      return table?.name && table?.category && table?.status;
    return false;
  };

  const onClickEdit = (item) => {
    setEditTableModal(true);
    setSelectedTable(item);
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
    const text = `Apakah anda yakin ingin menghapus meja ${name}?`;
    const successText = `Meja ${name} telah dihapus`;
    showConfirmationDialog(text, successText, (isConfirmed) => {
      isConfirmed && dispatch(handleDeleteTable(_id));
    });
  };

  const onCloseModal = (type) => {
    console.log({ type });
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

  return {
    table,
    addTableModal,
    setAddTableModal,
    selectedTable,
    editTableModal,
    onClickEdit,
    onAddTable,
    onUpdateTable,
    onDeleteTable,
    onCloseModal,
    onAddOrder,
  };
};

export default useTable;
