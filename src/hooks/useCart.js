/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeNotes,
  handleRemoveAllCart,
  handleRemoveCart,
  handleUpdateCart,
} from "../redux/slice/cartSlice";
import {
  handleUpdateMenuOrder,
  handleRemoveMenuOrder,
} from "../redux/slice/orderSlice";
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
  const [loading, setLoading] = useState(true);

  // selcetor redux
  const { data: cartData, notes } = useSelector((state) => state.cart);

  useEffect(() => {
    setCart(cartData);
  }, [cartData]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 750);

    return () => {
      setLoading(true);
      clearTimeout(loadingTimeout);
    };
  }, []);

  const onHandleChangeNotes = (event) => {
    event.preventDefault();
    const payload = event.target.notes.value;

    try {
      dispatch(handleChangeNotes(payload));
      successDialog("Berhasil menyimpan catatan");
      setShowNotesModal(false);
    } catch (error) {
      warningDialog(error);
    }
  };

  const onDeleteCart = ({ _id, name, is_take_away }, isUseInCart) => {
    const text = `Apakah anda yakin ingin menghapus pesanan ${name}?`;
    const successText = `Pesanan ${name} telah dihapus`;
    showConfirmationDialog(text, successText, (isConfirmed) => {
      if (isConfirmed) {
        isUseInCart
          ? dispatch(handleRemoveCart({ _id, is_take_away }))
          : dispatch(handleRemoveMenuOrder({ _id, is_take_away }));
      }
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
    return Boolean(notes && notes.length > 0);
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

  const onUpdateCart = (event, _id, isUseInCart) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      _id,
      ...data,
      is_take_away: data.type === "take_away",
    };

    delete payload.type;

    const title = `Apakah anda yakin ingin mengubah pesanan ?`;
    const successText = `Pesanan berhasil diperbaharui`;
    showConfirmationDialog(title, successText, (isConfirmed) => {
      if (isConfirmed) {
        isUseInCart
          ? dispatch(handleUpdateCart(payload))
          : dispatch(handleUpdateMenuOrder(payload));
        setShowEditModal(false);
      }
    });
  };

  return {
    cart,
    notes,
    loading,
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
