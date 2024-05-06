import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleUpdateMenu, resetSelectedMenu } from "../redux/slice/menuSlice";
import {
  getCartTable,
  handleAddToCart,
  handleSetTableCart,
} from "../redux/slice/cartSlice";
import { exitConfirmationDialog } from "../utils/utils";

const useFooterMenu = () => {
  // state
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [updateMenuModal, setUpdateMenuModal] = useState(false);

  // dispatch
  const dispatch = useDispatch();
  const { data: dataMenu } = useSelector((state) => state.menu);
  const tableCart = useSelector(getCartTable);

  //set Selected Menu
  useEffect(() => {
    const data = dataMenu.find((item) => item?.is_selected);
    setSelectedMenu(data);
  }, [dataMenu]);

  // when change take away type menu
  const handleIsTakeAway = (id, type) => {
    setSelectedMenu((prev) => {
      return {
        ...prev,
        is_take_away: type,
      };
    });
  };

  // change quantity selected menu
  const handleChangeQuantity = (id, type) => {
    setSelectedMenu((prev) => {
      return {
        ...prev,
        quantity: type === "plus" ? prev.quantity + 1 : prev.quantity - 1,
      };
    });
  };

  // when submit form notes from modal
  const handleSubmitFormNotes = (event) => {
    event.preventDefault();
    const notes = event.target.notes.value;
    setSelectedMenu((prev) => {
      return {
        ...prev,
        notes: notes,
      };
    });
    setUpdateMenuModal(false);
  };

  // when add to cart
  const onAddToCart = () => {
    dispatch(handleAddToCart(selectedMenu));
    setSelectedMenu(null);
    dispatch(resetSelectedMenu());
  };

  // validation menu data
  const isValidateMenu = (menu) => {
    return (
      menu?.name &&
      menu?.price &&
      menu?.category &&
      menu?.is_take_away !== undefined &&
      menu?.is_available !== undefined
    );
  };

  // when update menu
  const onUpdateMenu = (event, id) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newMenu = {
      ...data,
      price: +data.price,
      is_take_away: eval(data.is_take_away),
      is_available: eval(data.is_available),
      quantity: 1,
      notes: data.notes || "",
      _id: id,
    };

    const validate = isValidateMenu(newMenu);

    if (validate) {
      dispatch(handleUpdateMenu(newMenu));
      setUpdateMenuModal(false);
    } else {
      alert("Data tidak boleh ada yang kosong kecuali catatan");
    }
  };

  // close modal footer
  const onCloseModal = () => {
    exitConfirmationDialog((isConfirmed) => {
      isConfirmed && setUpdateMenuModal(false);
    });
  };

  // set title footer
  const getTitleData = () => {
    let title = selectedMenu?.name || "Silahkan Pilih Menu";
    tableCart && (title += " Untuk Meja " + tableCart?.name);
    return title;
  };

  // reset setTableCart
  const resetTableCart = () => {
    dispatch(handleSetTableCart(null));
  };

  return {
    selectedMenu,
    tableCart,
    updateMenuModal,
    setUpdateMenuModal,
    handleIsTakeAway,
    handleChangeQuantity,
    handleSubmitFormNotes,
    onAddToCart,
    onCloseModal,
    onUpdateMenu,
    getTitleData,
    resetTableCart,
  };
};

export default useFooterMenu;
