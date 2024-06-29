import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  finishOrder,
  getAllOrder,
  getSingleOrder,
  handleAddMenuOrder,
  setSingleOrderData,
  setSingleOrderNotes,
  toggleHandleServedMenu,
  toogleOnEdit,
  updateOrder,
} from "../redux/slice/orderSlice";
import { useState } from "react";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  successDialog,
  warningDialog,
} from "../utils/utils";
import { useLocation } from "react-router-dom";
import useTable from "./useTable";
import { useNavigate } from "react-router-dom";
import { setTotalPrice } from "../redux/slice/cartSlice";

const useOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const url = location.pathname;

  // state
  const [showModal, setShowModal] = useState(false);
  const [showAddMenuOrderModal, setShowAddMenuOrderModal] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);

  // selector redux
  const { order, singleOrder, onEdit, loading } = useSelector(
    (state) => state.order
  );

  const { getOrderByTableId } = useTable();

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

  const getOrderData = (id) => {
    const isOpenFromTable = isDetailsOpenFromTableMenu();
    if (isOpenFromTable) {
      getOrderByTableId(singleOrder.table._id);
    } else {
      getSingleOrderData(id);
    }
  };

  const onHandleActionEditOrder = (type, payload, callback) => {
    const handleAction = (confirmationText, successText) => {
      showConfirmationDialog(confirmationText, successText, (isConfirmed) => {
        if (isConfirmed) {
          if (type === "SAVE") {
            dispatch(setSingleOrderData(payload));
            const data = {
              menu: payload.menu,
              notes: payload.notes,
              is_finished: payload.is_finished,
              total_price: payload.total_price,
              _id: payload._id,
            };
            dispatch(updateOrder(data)).then((response) => {
              if (response.payload?.statusCode === 200) {
                getOrderData(payload._id);
                callback();
              } else if (response?.payload.includes("403")) {
                warningDialog("Mohon login terlebih dahulu");
              } else {
                warningDialog(response?.payload);
              }
            });
          } else if (type === "CANCEL") {
            callback();
          }
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

  const onToggleHandleServedMenu = (payload) => {
    dispatch(toggleHandleServedMenu(payload));
  };

  const onDeleteOrder = (id) => {
    const text = "Apakah anda yakin ingin menghapus pesanan ini ?";
    const successText = "Pesanan telah dihapus";
    showConfirmationDialog(text, successText, (isConfirmed) => {
      if (isConfirmed) {
        dispatch(deleteOrder(id)).then((response) => {
          if (response.payload?.statusCode === 200) {
            navigate("/pesanan");
          } else if (response?.payload.includes("403")) {
            warningDialog("Mohon login terlebih dahulu");
          } else {
            warningDialog(response?.payload);
          }
        });
      }
    });
  };

  const onSetTotalPrice = (value) => {
    dispatch(setTotalPrice(value));
  };

  const onFinishOrder = async (event, id) => {
    event.preventDefault();
    try {
      const text = "Apakah anda yakin ingin menyelesaikan pesanan ini ?";
      const successText = "Pesanan telah selesai";
      showConfirmationDialog(text, successText, (isConfirmed) => {
        if (isConfirmed) {
          dispatch(finishOrder(id)).then((response) => {
            if (response.payload?.statusCode === 200) {
              navigate("/pesanan");
            } else if (response?.payload.includes("403")) {
              warningDialog("Mohon login terlebih dahulu");
            } else {
              warningDialog(response?.payload);
            }
          });
        }
      });
    } catch (error) {
      warningDialog(error);
    }
  };

  return {
    loading,
    order,
    singleOrder,
    showModal,
    onEdit,
    showAddMenuOrderModal,
    showModalPayment,
    setShowModalPayment,
    onToggleOnEdit,
    onCancelEdit,
    onHandleAddNotes,
    handleShowModal,
    getAllOrderData,
    getSingleOrderData,
    isDetailsOpenFromTableMenu,
    onHandleAddMenuOrder,
    onHandleActionEditOrder,
    onToggleHandleServedMenu,
    onDeleteOrder,
    onSetTotalPrice,
    onFinishOrder,
  };
};

export default useOrder;
