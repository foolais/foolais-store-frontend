import { useState } from "react";
import { useSelector } from "react-redux";
import { formatRupiah, successDialog, warningDialog } from "../utils/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllTable,
  onChangeTableOrderStatus,
} from "../redux/slice/tableSlice";
import {
  handleRemoveAllCart,
  handleSetTableCart,
  setTotalPrice,
} from "../redux/slice/cartSlice";
import { postNewOrder } from "../redux/slice/orderSlice";

const useFooterCart = () => {
  const dispatch = useDispatch();

  // ? state
  const [cartTable, setCartTable] = useState(null);
  const [dropDownTable, setDropDownTable] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // ? redux selector
  const {
    data: cartData,
    table: cartTableData,
    totalPrice,
  } = useSelector((state) => state.cart);
  const { data: tableData } = useSelector((state) => state.table);

  // ? Use Effect
  useEffect(() => {
    const text = cartTableData?.name || cartTableData?.text;
    const value = cartTableData?._id || cartTableData?.value;
    const payload = cartTableData ? { text, value } : null;
    setCartTable(payload);
  }, [cartTableData]);

  useEffect(() => {
    dispatch(getAllTable());
  }, [dispatch]);

  useEffect(() => {
    const mappedData = tableData
      .filter((item) => item.status === "empty" && !item.is_order)
      .map((item) => {
        return { text: item.name, value: item._id };
      });

    setDropDownTable(mappedData);
  }, [tableData]);

  // ? Function
  const calculateTotalPrice = () => {
    const totalPrice = cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    dispatch(setTotalPrice(totalPrice));

    return formatRupiah(totalPrice);
  };

  const handleChangeTable = (value) => {
    dispatch(handleSetTableCart(value));
  };

  const handleAddOrder = () => {
    const carTableValue = cartTable?.value || cartTable?._id;

    try {
      if (cartData && cartData.length === 0)
        throw new Error("Masukkan Pesananan Terlebih Dahulu");
      else if (!carTableValue) throw new Error("Pilih Meja Terlebih Dahulu");
      else {
        const selectedTable = tableData.find(
          (item) => item._id === carTableValue
        );

        const payload = {
          menu: cartData.map((item) => {
            return {
              _id: item._id,
              name: item.name,
              price: item.price,
              category: item.category,
              quantity: item.quantity,
              is_take_away: item.is_take_away,
            };
          }),
          table: {
            _id: selectedTable._id,
            name: selectedTable.name,
            category: selectedTable.category,
          },
          total_price: totalPrice,
        };

        dispatch(postNewOrder(payload))
          .then((response) => {
            if (response.payload?.statusCode === 201) {
              dispatch(onChangeTableOrderStatus(carTableValue));
              dispatch(handleRemoveAllCart());
              successDialog("Berhasil Menambahkan Pesanan");
            } else if (response?.payload.includes("403")) {
              warningDialog("Mohon login terlebih dahulu");
            }
          })
          .catch((error) => {
            warningDialog(error.message);
          });
      }
    } catch (error) {
      warningDialog(error.message);
    }
  };

  return {
    dropDownTable,
    showPaymentModal,
    setShowPaymentModal,
    cartTable,
    setCartTable,
    calculateTotalPrice,
    handleChangeTable,
    handleAddOrder,
  };
};

export default useFooterCart;
