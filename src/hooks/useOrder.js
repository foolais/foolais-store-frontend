import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeNotes,
  handleChangePaymentMethod,
  toogleOnEdit,
} from "../redux/slice/orderSlice";
import { useState } from "react";
import {
  exitConfirmationDialog,
  successDialog,
  warningDialog,
} from "../utils/utils";

const useOrder = () => {
  const dispatch = useDispatch();

  // state
  const [showModal, setShowModal] = useState(false);

  // selector redux
  const { data, onEdit } = useSelector((state) => state.order);

  const onToggleOnEdit = () => {
    dispatch(toogleOnEdit());
  };

  const onChangePayment = (value) => {
    dispatch(handleChangePaymentMethod(value));
  };

  const onHandleAddNotes = (event) => {
    event.preventDefault();
    const payload = event.target.notes.value;

    try {
      dispatch(handleChangeNotes(payload));
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

  const isNotesFilled = () => {
    return Boolean(data.notes && data.notes.length > 0);
  };

  return {
    data,
    showModal,
    onEdit,
    onToggleOnEdit,
    onHandleAddNotes,
    handleShowModal,
    onChangePayment,
    isNotesFilled,
  };
};

export default useOrder;
