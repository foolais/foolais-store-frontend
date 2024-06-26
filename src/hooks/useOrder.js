import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  getSingleOrder,
  handleAddMenuOrder,
  setSingleOrderData,
  setSingleOrderNotes,
  toogleOnEdit,
} from "../redux/slice/orderSlice";
import { useState } from "react";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  successDialog,
  warningDialog,
} from "../utils/utils";
import { useLocation } from "react-router-dom";

const useOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const url = location.pathname;

  // state
  const [showModal, setShowModal] = useState(false);
  const [showAddMenuOrderModal, setShowAddMenuOrderModal] = useState(false);

  // selector redux
  const { order, singleOrder, onEdit, loading } = useSelector(
    (state) => state.order
  );

  const getAllOrderData = async () => {
    if (loading) return;
    try {
      await dispatch(getAllOrder());
    } catch (error) {
      warningDialog(error);
    }
  };

  const getSingleOrderData = async (id, callback = () => {}) => {
    if (loading) return;
    try {
      await dispatch(getSingleOrder(id));
      if (callback && typeof callback === "function") {
        callback();
      }
    } catch (error) {
      warningDialog(error);
    }
  };

  const onToggleOnEdit = () => {
    dispatch(toogleOnEdit());
  };

  const onCancelEdit = () => {
    dispatch(toogleOnEdit());
  };

  const onChangePayment = (value) => {
    console.log("tesa todo", value);
  };

  const onHandleAddNotes = (event) => {
    event.preventDefault();
    const payload = event.target.notes.value;

    try {
      dispatch(setSingleOrderNotes(payload));
      successDialog("Berhasil menyimpan catatan");
      setShowModal(false);
    } catch (error) {
      warningDialog(error);
    }
  };

  const handleShowModal = (data, type) => {
    if (type === "addMenu" && data) {
      setShowAddMenuOrderModal(data);
    } else if (type === "addMenu" && !data) {
      exitConfirmationDialog((isConfirmed) => {
        isConfirmed && setShowAddMenuOrderModal(data);
      });
    } else if (type === "notes" && data) {
      setShowModal(data);
    } else if (type === "notes" && !data) {
      exitConfirmationDialog((isConfirmed) => {
        isConfirmed && setShowModal(data);
      });
    }
  };

  const isDetailsOpenFromTableMenu = () => {
    const hasMeja = url.includes("meja");
    const hasPesanan = url.includes("pesanan");

    return hasMeja && hasPesanan;
  };

  const onHandleActionEditOrder = (type, payload, callback) => {
    const handleAction = (confirmationText, successText) => {
      showConfirmationDialog(confirmationText, successText, (isConfirmed) => {
        if (isConfirmed) {
          dispatch(setSingleOrderData(payload));
          callback();
        }
      });
    };

    switch (type) {
      case "SAVE":
        handleAction(
          "Apakah anda yakin ingin menyimpan perubahan ?",
          "Perubahan tersimpan"
        );
        break;
      case "CANCEL":
        handleAction(
          "Apakah anda yakin ingin membatalkan perubahan ?",
          "Perubahan dibatalkan"
        );
        break;
      default:
        break;
    }
  };

  const onHandleAddMenuOrder = (payload) => {
    try {
      if (!payload?.name) throw new Error("Menu harus diisi");
      if (payload?.quantity <= 0) throw new Error("Jumlah pesanan minimal 1");

      dispatch(handleAddMenuOrder(payload));
      successDialog("Berhasil menambahkan menu");
      setShowAddMenuOrderModal(false);
    } catch (error) {
      warningDialog(error.message || error);
    }
  };

  return {
    order,
    singleOrder,
    showModal,
    onEdit,
    showAddMenuOrderModal,
    onToggleOnEdit,
    onCancelEdit,
    onHandleAddNotes,
    handleShowModal,
    onChangePayment,
    getAllOrderData,
    getSingleOrderData,
    isDetailsOpenFromTableMenu,
    onHandleAddMenuOrder,
    onHandleActionEditOrder,
  };
};

export default useOrder;
