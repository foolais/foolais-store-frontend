import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeNotes,
  handleRemoveAllCart,
  handleRemoveCart,
} from "../redux/slice/cartSlice";
import {
  showConfirmationDialog,
  successDialog,
  warningDialog,
} from "../utils/utils";

const useCart = () => {
  const dispatch = useDispatch();
  const { data: cartData } = useSelector((state) => state.cart);

  // state
  const [cart, setCart] = useState(null);

  useEffect(() => {
    setCart(cartData);
  }, [cartData]);

  const handleSubmitFormNotes = (event, _id, is_take_away) => {
    event.preventDefault();
    const notes = event.target.notes.value;
    const payload = { _id, is_take_away, notes };

    try {
      dispatch(handleChangeNotes(payload));
      successDialog("Berhasil menambahkan catatan");
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

  const isNotesFilled = (notes) => {
    return notes && notes.length > 0 ? true : false;
  };

  return {
    cart,
    handleSubmitFormNotes,
    onDeleteCart,
    handleDeleteAllCart,
    isNotesFilled,
  };
};

export default useCart;
