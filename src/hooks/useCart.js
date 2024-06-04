import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeNotes,
  handleRemoveAllCart,
  handleRemoveCart,
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

  return {
    cart,
    showNotesModal,
    notes,
    onDeleteCart,
    handleDeleteAllCart,
    isNotesFilled,
    handleShowNotesModal,
    onHandleChangeNotes,
  };
};

export default useCart;
