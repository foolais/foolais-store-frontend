import { useDispatch, useSelector } from "react-redux";
import { handleChangeNotes, toogleOnEdit } from "../redux/slice/orderSlice";
import { useState } from "react";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
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

  const onHandleAddNotes = (event) => {
    event.preventDefault();

    const text = "Apakah anda yakin ingin menyimpan perubahan?";
    const successText = "Perubahan telah disimpan";

    try {
      showConfirmationDialog(text, successText, (isConfirmed) => {
        isConfirmed && dispatch(handleChangeNotes(event.target.notes.value));
      });
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

  return {
    data,
    showModal,
    onEdit,
    onToggleOnEdit,
    onHandleAddNotes,
    handleShowModal,
  };
};

export default useOrder;
