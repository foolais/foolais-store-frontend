import { useState } from "react";
import { useSelector } from "react-redux";
import { formatRupiah } from "../utils/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTable } from "../redux/slice/tableSlice";
import { handleSetTableCart } from "../redux/slice/cartSlice";

const useFooterCart = () => {
  const dispatch = useDispatch();

  // ? state
  const [cartTable, setCartTable] = useState(null);
  const [dropDownTable, setDropDownTable] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // ? redux selector
  const { data: cartData, table: cartTableData } = useSelector(
    (state) => state.cart
  );
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
    const mappedData = tableData.map((item) => {
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

    return formatRupiah(totalPrice);
  };

  const handleChangeTable = (value) => {
    dispatch(handleSetTableCart(value));
  };

  return {
    dropDownTable,
    showPaymentModal,
    setShowPaymentModal,
    cartTable,
    setCartTable,
    calculateTotalPrice,
    handleChangeTable,
  };
};

export default useFooterCart;
