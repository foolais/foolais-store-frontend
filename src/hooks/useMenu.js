import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleSelectedMenu,
  getAllMenu,
  postNewMenu,
  deleteMenu,
} from "../redux/slice/menuSlice";
import { getSearchData } from "../redux/slice/searchBarSlice";
import {
  exitConfirmationDialog,
  showConfirmationDialog,
  successDialog,
  warningDialog,
} from "../utils/utils";

const useMenu = () => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(null);
  const [addMenuModal, setAddMenuModal] = useState(false);

  const { data: dataMenu, loading } = useSelector((state) => state.menu);

  const searchData = useSelector(getSearchData);

  // GET data menu from database
  const getAllMenuData = () => {
    if (loading) return;
    try {
      // GET data menu from database
      dispatch(getAllMenu());
    } catch (error) {
      // GET data from local storage
      setMenu(dataMenu);
    }
  };

  useEffect(() => {
    getAllMenuData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onCloseModal = () => {
    exitConfirmationDialog((isConfirmed) => {
      isConfirmed && setAddMenuModal(false);
    });
  };

  const isValidateMenu = (menu) => {
    return menu?.name && menu?.price && menu?.category;
  };

  //   When click/select menu
  const onSelectedMenu = (id) => {
    console.log({ id });
    dispatch(handleSelectedMenu(id));
  };

  //   CRUD Event
  //   POST new menu
  const onAddMenu = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const validate = isValidateMenu(data);
    const isSameMenu = menu.some(
      (item) =>
        item.name.toLowerCase().trim() === data.name.toLocaleLowerCase().trim()
    );

    if (isSameMenu) {
      warningDialog("Menu sudah ada");
    } else if (!validate) {
      warningDialog("Tidak boleh ada data yang kosong");
    } else {
      const payload = { ...data, price: +data.price };
      dispatch(postNewMenu(payload))
        .then((response) => {
          if (response.payload?.statusCode === 201) {
            successDialog(response.payload.message);
            dispatch(getAllMenu());
            setAddMenuModal(false);
          } else if (response?.payload.includes("403")) {
            warningDialog("Mohon login terlebih dahulu");
          }
        })
        .catch((error) => {
          warningDialog(error);
        });
    }
  };
  //   DELETE menu
  const onDeleteMenu = ({ _id, name }) => {
    const text = `Apakah anda yakin ingin menghapus menu ${name}?`;
    const successText = `Menu ${name} telah dihapus`;
    showConfirmationDialog(text, successText, (isConfirmed) => {
      isConfirmed &&
        dispatch(deleteMenu(_id))
          .then((response) => {
            if (response.payload?.statusCode === 200) {
              dispatch(getAllMenu());
            } else if (response?.payload.includes("403")) {
              warningDialog("Mohon login terlebih dahulu");
            }
          })
          .catch((error) => {
            warningDialog(error);
          });
    });
  };

  return {
    menu,
    searchData,
    addMenuModal,
    setAddMenuModal,
    onCloseModal,
    onSelectedMenu,
    onDeleteMenu,
    onAddMenu,
  };
};

export default useMenu;
