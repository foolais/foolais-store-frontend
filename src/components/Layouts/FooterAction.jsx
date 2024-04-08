import Counter from "../Fragments/Counter";
import Divider from "../Elements/Divider/Divider";
import CardMenu from "../Fragments/CardMenu";
import Button from "../Elements/Button/Button";
import { AiOutlineRight } from "react-icons/ai";
import { getMenuData } from "../../redux/slice/menuSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const FooterAction = () => {
  const dataMenu = useSelector(getMenuData);
  const [selectedMenu, setSelectedMenu] = useState(null);

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

  return (
    <div className="fixed bottom-0 right-0 left-0 h-28 bg-neutral ml-16 flex">
      {/* Title Name */}
      {selectedMenu && (
        <div className="absolute -top-6 left-0 bg-accent py-2 px-4 rounded-r-md text-secondary font-semibold">
          {selectedMenu.name}
        </div>
      )}
      {/* Counter */}
      <Counter
        value={selectedMenu ? selectedMenu.quantity : 1}
        className="ml-2 pt-2"
        handleCounter={handleChangeQuantity}
      />
      <Divider className="divider-horizontal" />
      <div className="flex flex-col gap-2 justify-center pt-2">
        {/* Tipe */}
        <CardMenu.Type
          id={selectedMenu?._id}
          isTakeAway={selectedMenu?.is_take_away}
          handleIsTakeAway={handleIsTakeAway}
        />
        {/* Catatan */}
        <CardMenu.Notes
          data={selectedMenu?.notes}
          textButton={`${
            selectedMenu?.notes && selectedMenu?.notes.length > 1
              ? "Lihat"
              : "Tambah"
          } Catatan`}
          title="Catatan"
          btnClassName="btn-sm btn-outline"
        />
      </div>
      <Divider className="divider-horizontal" />
      <div className="flex items-center pt-2">
        <Button
          className="bg-accent text-secondary"
          onClick={() => console.log({ selectedMenu })}
        >
          Tambah
          <AiOutlineRight size={15} />
        </Button>
      </div>
      {/* Button Add */}
    </div>
  );
};

export default FooterAction;
