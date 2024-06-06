/* eslint-disable react/prop-types */
import Button from "../Elements/Button/Button";
import PaymentModal from "../Fragments/Modal/PaymentModal";
import useFooterCart from "../../hooks/useFooterCart";
import FooterLayouts from "./Footer/FooterLayouts";
import AutoComplete from "../Elements/Input/AutoComplete";

const FooterCartAction = () => {
  const {
    dropDownTable,
    cartTable,
    showPaymentModal,
    setShowPaymentModal,
    calculateTotalPrice,
    handleChangeTable,
  } = useFooterCart();

  return (
    <>
      <FooterLayouts>
        <FooterLayouts.Title title="Keranjang" />
        <div className="flex items-center gap-2 my-4">
          <p className="">Pilih Meja : </p>
          <AutoComplete
            name="tableCart"
            widthClassName="w-40 min-w-40"
            placeholder="Pilih Meja"
            data={dropDownTable}
            value={cartTable}
            onSelect={handleChangeTable}
          />
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg font-semibold">
            Total Harga :{" "}
            <span className="text-secondary font-bold">
              {calculateTotalPrice()}
            </span>
          </p>
          <Button
            onClick={() => setShowPaymentModal(true)}
            className="btn-sm btn-outline border-[1px] border-primary hover:bg-primary"
          >
            Bayar Sekarang
          </Button>
        </div>
        <FooterLayouts.BtnAction>Tambah Pesanan</FooterLayouts.BtnAction>
      </FooterLayouts>
      <PaymentModal
        showModal={showPaymentModal}
        closeModal={() => setShowPaymentModal(false)}
      />
    </>
  );
};

export default FooterCartAction;
