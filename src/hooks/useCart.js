import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeNotes,
  handleRemoveAllCart,
  handleRemoveCart,
  handleUpdateCart,
} from "../redux/slice/cartSlice";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  successDialog,
  warningDialog,
} from "../utils/utils";

const useCart = () => {
  const dispatch = useDispatch();

  // state
  const [cart, setCart] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // selcetor redux
  const { data: cartData, notes } = useSelector((state) => state.cart);

  // selector redux

  useEffect(() => {
    setCart(cartData);
  }, [cartData]);

  const onHandleChangeNotes = (event) => {
    event.preventDefault();
    const payload = event.target.notes.value;

    console.log({ payload });

    try {
      dispatch(handleChangeNotes(payload));
      successDialog("Berhasil menyimpan catatan");
      setShowNotesModal(false);
    } catch (error) {
      warningDialog(error);
    }
  };

  const onDeleteCart = ({ _id, name, is_take_away }) => {
    const text = `Apakah anda yakin ingin menghapus pesanan ${name}?`;
    const successText = `Pesanan ${name} telah dihapus`;
    showConfirmationDialog(text, successText, (isConfirmed) => {
      isConfirmed && dispatch(handleRemoveCart({ _id, is_take_away }));
    });
  };

  const handleDeleteAllCart = () => {
    const title = `Hapus Semua Pesananan ?`;
    const successText = `Semua Pesanan telah dihapus`;
    showConfirmationDialog(title, successText, (isConfirmed) => {
      isConfirmed && dispatch(handleRemoveAllCart());
    });
  };

  const isNotesFilled = () => {
    return notes && notes.length > 0 ? true : false;
  };

  const handleShowNotesModal = (type) => {
    if (type) {
      setShowNotesModal(type);
    } else {
      exitConfirmationDialog((isConfirmed) => {
        isConfirmed && setShowNotesModal(type);
      });
    }
  };

  const handleShowEditModal = (type) => {
    if (type) {
      setShowEditModal(type);
    } else {
      exitConfirmationDialog((isConfirmed) => {
        isConfirmed && setShowEditModal(type);
      });
    }
  };

  const onUpdateCart = (event, _id) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log({ data });

    const payload = {
      _id,
      ...data,
      is_take_away: data.type === "take_away",
    };

    delete payload.type;

    const title = `Apakah anda yakin ingin mengubah pesanan ?`;
    const successText = `Pesanan berhasil diperbaharui`;
    showConfirmationDialog(title, successText, (isConfirmed) => {
      isConfirmed &&
        dispatch(handleUpdateCart(payload)) &&
        setShowEditModal(false);
    });
  };

  return {
    cart,
    notes,
    showNotesModal,
    showEditModal,
    onDeleteCart,
    handleDeleteAllCart,
    isNotesFilled,
    handleShowNotesModal,
    onHandleChangeNotes,
    handleShowEditModal,
    onUpdateCart,
  };
};

export default useCart;
