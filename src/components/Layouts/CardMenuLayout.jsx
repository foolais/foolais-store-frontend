import Card from "../Fragments/Card";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMenuData,
  getMenuStatus,
  handleAddMenu,
  handleSelectedMenu,
  handleDeleteMenu,
  getAllMenu,
} from "../../redux/slice/menuSlice";
import { getSearchData } from "../../redux/slice/searchBarSlice";
import CardAddNew from "../Fragments/CardAddNew";
import Modal from "../Fragments/Modal";
import FormMenu from "../Fragments/FormMenu";
import Button from "../Elements/Button/Button";
import { AiOutlineDelete } from "react-icons/ai";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  warningDialog,
} from "../../utils/utils";

const CardMenuLayout = () => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(null);
  const [addMenuModal, setAddMenuModal] = useState(false);

  const dataMenu = useSelector(getMenuData);
  const statusMenu = useSelector(getMenuStatus);

  const searchData = useSelector(getSearchData);

  useEffect(() => {
    if (statusMenu === "idle") {
      dispatch(getAllMenu());
    }
  }, [statusMenu, dispatch]);

  // get data menu from local storage
  useEffect(() => {
    if (statusMenu === "idle") {
      setMenu(dataMenu);
    }
  }, [statusMenu, dataMenu]);

  // filter menu by search data navbar
  useEffect(() => {
    if (searchData) {
      const filteredMenu = dataMenu.filter((item) =>
        item.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setMenu(filteredMenu);
    } else {
      setMenu(dataMenu);
    }
  }, [searchData, dataMenu]);

  const onAddMenu = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const validate = isValidateMenu(data);

    if (validate) {
      dispatch(handleAddMenu(data));
      setAddMenuModal(false);
    } else {
      warningDialog("Tidak boleh ada data yang kosong");
    }
  };

  const isValidateMenu = (menu) => {
    return menu?.name && menu?.price && menu?.category;
  };

  const onDeleteMenu = ({ _id, name }) => {
    const text = `Apakah anda yakin ingin menghapus menu ${name}?`;
    const successText = `Menu ${name} telah dihapus`;
    showConfirmationDialog(text, successText, (isConfirmed) => {
      isConfirmed && dispatch(handleDeleteMenu(_id));
    });
  };

  const onCloseModal = () => {
    exitConfirmationDialog((isConfirmed) => {
      isConfirmed && setAddMenuModal(false);
    });
  };

  return (
    <div className="w-full h-auto">
      <div className="flex items-center justify-around flex-wrap gap-8">
        {searchData && menu && menu.length === 0 && (
          <div className="w-full flex items-center justify-center text-neutral p-4 font-semibold">
            {`Tidak Ada Menu Untuk "${searchData}" `}
          </div>
        )}
        {menu &&
          menu.length > 0 &&
          menu.map((item) => {
            return (
              <Card
                key={item._id}
                onClick={() =>
                  isValidateMenu(item) && dispatch(handleSelectedMenu(item._id))
                }
                className="cursor-pointer hover:scale-105 duration-300 min-h-32 max-h-32"
              >
                <div
                  className={`card-body ${
                    item.is_selected && "bg-accent text-secondary"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    {/* Nama Menu */}
                    <Card.Title
                      title={item.name}
                      className="font-semibold max-w-[80%]"
                    />
                    {/* Button Delete */}
                    <Button
                      className="btn-circle btn-outline btn-sm btn-error absolute right-4"
                      onClick={() => onDeleteMenu(item)}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </div>
                  <Card.Price price={item.price} className="text-lg " />
                </div>
              </Card>
            );
          })}
        <CardAddNew
          title="Tambah Menu Baru"
          cardClassName="min-h-32 max-h-32"
          titleClassName="font-semibold mt-4"
          actionClassName="mt-4"
          btnOnClick={() => setAddMenuModal(true)}
        />
        <Modal
          title="Tambah Menu Baru"
          showModal={addMenuModal}
          closeModal={() => onCloseModal()}
        >
          <FormMenu
            onSubmit={(event) => onAddMenu(event)}
            btnText="Tambah Menu"
          />
        </Modal>
      </div>
    </div>
  );
};

export default CardMenuLayout;
