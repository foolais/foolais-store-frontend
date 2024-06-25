/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";
import useMenu from "../../../hooks/useMenu";
import useOrder from "../../../hooks/useOrder";

const FormAddMenu = () => {
  const { menu, loading, getAllMenuData } = useMenu();
  const { onHandleAddMenuOrder } = useOrder();

  const [menuData, setMenuData] = useState(menu);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const typeData = [
    { text: "Makan Ditempat", value: false },
    { text: "Dibawa Pulang", value: true },
  ];

  useEffect(() => {
    getAllMenuData();
  }, []);

  useEffect(() => {
    const mappedMenu = menu?.map((item) => {
      return {
        text: item?.name,
        value: item?._id,
      };
    });
    setMenuData(mappedMenu);
  }, [menu]);

  const handleSelectedMenu = (selectedData) => {
    if (selectedData) {
      const getMenu = menu?.find((item) => item?._id === selectedData.value);
      const mappedMenu = {
        ...getMenu,
        quantity: 1,
        is_take_away: false,
        is_served: false,
      };
      setSelectedMenu(mappedMenu);
    } else {
      setSelectedMenu(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      name: selectedMenu?.name,
      quantity: +data?.quantity,
      is_take_away: eval(data?.type),
      is_served: eval(selectedMenu?.is_served),
      price: +selectedMenu?.price,
      category: selectedMenu?.category,
      _id: selectedMenu?._id,
    };

    onHandleAddMenuOrder(payload);
  };

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>;
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-4">
      <FormInput
        isAutoComplete={true}
        title="Makanan"
        name="name"
        data={menuData}
        placeholder="Pilih Makanan..."
        value={selectedMenu?.name}
        onSelect={(selectedData) => handleSelectedMenu(selectedData)}
      />
      <FormInput
        title="Jumlah"
        type="number"
        name="quantity"
        placeholder="Masukkan Jumlah..."
        isInput={true}
        defaultValue={selectedMenu?.quantity}
        isDisabled={selectedMenu === null}
        value={selectedMenu?.quantity}
      />
      <FormInput
        title="Tipe"
        data={typeData}
        name="type"
        isSelect={true}
        defaultValue={selectedMenu?.is_take_away}
        isDisabled={selectedMenu === null}
      />
      <FormInput
        title="Harga Satuan"
        type="number"
        name="price"
        placeholder="Masukkan Harga..."
        isInput={true}
        defaultValue={selectedMenu?.price}
        isDisabled={true}
      />
      <Button className="bg-secondary text-white mt-4 w-full">
        Tambah Pesanan
      </Button>
    </form>
  );
};

export default FormAddMenu;
