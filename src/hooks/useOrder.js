import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  getSingleOrder,
  setSingleOrderData,
  toogleOnEdit,
} from "../redux/slice/orderSlice";
import { useState } from "react";
import {
  exitConfirmationDialog,
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
      console.log("tesa todo", payload);
      successDialog("Berhasil menyimpan catatan");
      setShowModal(false);
    } catch (error) {
      warningDialog(error);
    }
  };

  const handleShowModal = (type) => {
    if (type) {
      setShowModal(type);
    } else {
      exitConfirmationDialog((isConfirmed) => {
        isConfirmed && setShowModal(type);
      });
    }
  };

  const isDetailsOpenFromTableMenu = () => {
    const hasMeja = url.includes("meja");
    const hasPesanan = url.includes("pesanan");

    return hasMeja && hasPesanan;
  };

  const onSetSingleOrderMenu = (menu) => {
    dispatch(setSingleOrderData(menu));
  };

  // const isNotesFilled = () => {
  //   return Boolean(data.notes && data.notes.length > 0);
  // };

  return {
    order,
    singleOrder,
    showModal,
    onEdit,
    onToggleOnEdit,
    onCancelEdit,
    onHandleAddNotes,
    handleShowModal,
    onChangePayment,
    getAllOrderData,
    getSingleOrderData,
    isDetailsOpenFromTableMenu,
    onSetSingleOrderMenu,
  };
};

export default useOrder;
