import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTable,
  getAllTable,
  handleDeleteTable,
  postNewTable,
  updateTable,
} from "../redux/slice/tableSlice";
import { useNavigate } from "react-router-dom";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  successDialog,
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
      dispatch(postNewTable(data)).then((response) => {
        if (response.payload?.statusCode === 201) {
          successDialog(response.payload.message);
          dispatch(getAllTable());
          setAddTableModal(false);
        } else if (response?.payload.includes("403")) {
          warningDialog("Mohon login terlebih dahulu");
        }
      });
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
      dispatch(updateTable(updatedTable)).then((response) => {
        if (response.payload?.statusCode === 200) {
          successDialog(response.payload.message);
          dispatch(getAllTable());
          setEditTableModal(false);
        } else if (response?.payload.includes("403")) {
          warningDialog("Mohon login terlebih dahulu");
        }
      });
    } else {
      alert("Tidak boleh ada data yang kosong");
    }
  };

  // Delete Table Card
  const onDeleteTable = ({ _id, name }) => {
    const text = `Apakah anda yakin ingin menghapus meja ${name}?`;
    const successText = `Meja ${name} telah dihapus`;
    showConfirmationDialog(text, successText, (isConfirmed) => {
      isConfirmed &&
        dispatch(deleteTable(_id))
          .then((response) => {
            if (response.payload?.statusCode === 200) {
              dispatch(getAllTable());
            } else if (response?.payload.includes("403")) {
              warningDialog("Mohon login terlebih dahulu");
            }
          })
          .catch((error) => {
            warningDialog(error);
          });
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
