/* eslint-disable react/prop-types */
import useFooterCart from "../../../hooks/useFooterCart";
import FooterLayout from "./FooterLayout";
import AutoComplete from "../../Elements/Input/AutoComplete";
import { useEffect } from "react";

const FooterCartAction = () => {
  const {
    dropDownTable,
    cartTable,
    setCartTable,
    calculateTotalPrice,
    handleChangeTable,
    handleAddOrder,
  } = useFooterCart();

  useEffect(() => {
    if (!cartTable) setCartTable("");
  }, [cartTable, setCartTable]);

  return (
    <>
      <FooterLayout>
        <FooterLayout.Title title="Keranjang" />
        <div className="flex items-center gap-2 my-4">
          <p className="text-sm md:text-md">Pilih Meja : </p>
          <AutoComplete
            name="tableCart"
            widthClassName="w-40 min-w-40"
            placeholder="Pilih Meja"
            data={dropDownTable}
            value={cartTable}
            onSelect={handleChangeTable}
          />
        </div>
        <p className="text-sm text-right md:text-lg font-semibold">
          Total Harga :{" "}
          <span className="text-secondary font-bold">
            {calculateTotalPrice()}
          </span>
        </p>
        <FooterLayout.BtnAction onClick={handleAddOrder}>
          Tambah Pesanan
        </FooterLayout.BtnAction>
      </FooterLayout>
    </>
  );
};

export default FooterCartAction;
