import Counter from "../Fragments/Counter";
import Divider from "../Elements/Divider/Divider";
import Card from "../Fragments/Card";
import Button from "../Elements/Button/Button";
import { AiOutlineRight } from "react-icons/ai";
import {
  getMenuData,
  handleUpdateMenu,
  resetSelectedMenu,
} from "../../redux/slice/menuSlice";
import { handleAddToCart } from "../../redux/slice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../Fragments/Modal";
import FormMenu from "../Fragments/FormMenu";

const FooterAction = () => {
  const dispatch = useDispatch();
  const dataMenu = useSelector(getMenuData);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [updateMenuModal, setUpdateMenuModal] = useState(false);

  useEffect(() => {
    const data = dataMenu.find((item) => item.is_selected);
    setSelectedMenu(data);
  }, [dataMenu]);

  const handleIsTakeAway = (id, type) => {
    setSelectedMenu((prev) => {
      return {
        ...prev,
        is_take_away: type,
      };
    });
  };

  const handleChangeQuantity = (id, type) => {
    setSelectedMenu((prev) => {
      return {
        ...prev,
        quantity: type === "plus" ? prev.quantity + 1 : prev.quantity - 1,
      };
    });
  };

  const handleSubmitFormNotes = (event) => {
    event.preventDefault();
    const notes = event.target.notes.value;
    setSelectedMenu((prev) => {
      return {
        ...prev,
        notes: notes,
      };
    });
  };

  const onAddToCart = () => {
    dispatch(handleAddToCart(selectedMenu));
    setSelectedMenu(null);
    dispatch(resetSelectedMenu());
  };

  const onUpdateMenu = (event, id) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newMenu = {
      ...data,
      price: +data.price,
      is_take_away: !!data.is_take_away,
      is_available: !!data.is_available,
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

  const isValidateMenu = (menu) => {
    return (
      menu?.name &&
      menu?.price &&
      menu?.category &&
      menu?.is_take_away &&
      menu?.is_available
    );
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 h-[7.5rem] bg-neutral ml-16 flex">
      {/* Title Name */}
      <div className="absolute -top-6 left-0 bg-accent py-2 px-4 rounded-r-md text-secondary font-semibold">
        {selectedMenu?.name || "Silahkan Pilih Menu"}
      </div>
      {/* Counter */}
      <Counter
        value={selectedMenu ? selectedMenu?.quantity : 1}
        className="ml-2 pt-2"
        handleCounter={handleChangeQuantity}
        disabled={!selectedMenu?.name}
      />
      <Divider className="divider-horizontal ml-0.5 mr-0.5" />
      <div className="flex flex-col gap-2 justify-center pt-2">
        {/* Tipe */}
        <Card.Type
          id={selectedMenu?._id}
          isTakeAway={selectedMenu?.is_take_away}
          handleIsTakeAway={handleIsTakeAway}
          disabled={!selectedMenu?.name}
        />
        {/* Catatan */}
        <Card.Notes
          data={selectedMenu?.notes}
          textButton={`${
            selectedMenu?.notes && selectedMenu?.notes.length > 1
              ? "Lihat"
              : "Tambah"
          } Catatan`}
          title="Catatan"
          btnClassName="btn-sm btn-outline"
          disabled={!selectedMenu?.name}
          onSubmit={handleSubmitFormNotes}
        />
      </div>
      <Divider className="divider-horizontal ml-0.5 mr-0.5" />
      <div className="flex flex-col items-center pt-2 gap-2">
        {/* Button Delete Menu */}
        <Button
          className="bg-accent text-secondary"
          disabled={!selectedMenu?.name}
          onClick={() => setUpdateMenuModal(true)}
        >
          Ubah Menu
          <AiOutlineRight size={15} />
        </Button>
        {/* Button Add */}
        <Button
          className="bg-accent text-secondary"
          disabled={!selectedMenu?.name}
          onClick={onAddToCart}
        >
          Tambah Pesanan
          <AiOutlineRight size={15} />
        </Button>
      </div>
      <Modal
        title={`Ubah Menu ${selectedMenu?.name}`}
        showModal={updateMenuModal}
        closeModal={() => setUpdateMenuModal(false)}
      >
        <FormMenu
          isEdit={true}
          btnText="Ubah Menu"
          defaultValue={selectedMenu}
          onSubmit={(event) => onUpdateMenu(event, selectedMenu._id)}
        />
      </Modal>
    </div>
  );
};

export default FooterAction;
