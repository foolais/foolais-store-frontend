import { useState, useEffect } from "react";
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
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  warningDialog,
} from "../../utils/utils";
import CardMenu from "../Fragments/Card/CardMenu";

const CardMenuLayout = () => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(null);
  const [addMenuModal, setAddMenuModal] = useState(false);

  const dataMenu = useSelector(getMenuData);
  const statusMenu = useSelector(getMenuStatus);

  const searchData = useSelector(getSearchData);

  useEffect(() => {
    if (statusMenu === "idle") {
      try {
        // GET data menu from database
        dispatch(getAllMenu());
      } catch (error) {
        // GET data from local storage
        setMenu(dataMenu);
      }
    }
  }, [statusMenu, dispatch, dataMenu]);

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
        <CardAddNew
          title="Tambah Menu Baru"
          cardClassName="min-h-32 max-h-32"
          titleClassName="font-semibold mt-4"
          actionClassName="mt-4"
          btnOnClick={() => setAddMenuModal(true)}
        />
        {menu &&
          menu.length > 0 &&
          menu.map((item) => {
            return (
              <CardMenu
                key={item._id}
                item={item}
                onCardClick={() => dispatch(handleSelectedMenu(item._id))}
                onCardDelete={() => onDeleteMenu(item)}
              />
            );
          })}
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
