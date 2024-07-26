/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import useFooterCart from "../../../hooks/useFooterCart";
import FooterLayout from "./FooterLayout";
import AutoComplete from "../../Elements/Input/AutoComplete";
import Button from "../../Elements/Button/Button";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import useCart from "../../../hooks/useCart";
import NotesModal from "../Modal/NotesModal";

const FooterCartAction = () => {
  const {
    dropDownTable,
    cartTable,
    calculateTotalPrice,
    handleChangeTable,
    handleAddOrder,
  } = useFooterCart();

  const {
    notes,
    showNotesModal,
    isNotesFilled,
    handleShowNotesModal,
    onHandleChangeNotes,
  } = useCart();

  return (
    <>
      <FooterLayout>
        <FooterLayout.Title title="Keranjang" />
        <div className="grid grid-cols-[max-content_10px_max-content] items-center gap-4 my-4">
          <p className="text-sm md:text-md">Catatan</p>
          <span>:</span>
          <div className="flex items-center gap-2">
            <p>{isNotesFilled() ? "Ubah Catatan" : "Tambah Catatan"}</p>
            <Button
              onClick={() => handleShowNotesModal(true)}
              className="btn-circle btn-sm bg-secondary text-white hover:bg-white hover:text-secondary hover:border-secondary ease-in-out duration-300"
            >
              {isNotesFilled() ? (
                <AiOutlineEdit size={18} />
              ) : (
                <AiOutlinePlus size={12} />
              )}
            </Button>
          </div>
          <p className="text-sm md:text-md">Pilih Meja</p>
          <span>:</span>
          <AutoComplete
            name="tableCart"
            widthClassName="w-40 min-w-40 lg:w-48 lg:min-w-48"
            placeholder="Pilih Meja"
            data={dropDownTable}
            value={cartTable}
            onSelect={handleChangeTable}
          />
        </div>
        <p className="text-lg text-right font-semibold">
          Total Harga :{" "}
          <span className="text-secondary font-bold">
            {calculateTotalPrice()}
          </span>
        </p>
        <FooterLayout.BtnAction onClick={handleAddOrder} disabled={!cartTable}>
          Tambah Pesanan
        </FooterLayout.BtnAction>
      </FooterLayout>
      {showNotesModal && (
        <NotesModal
          title={isNotesFilled() ? "Ubah Catatan" : "Tambah Catatan"}
          showModal={showNotesModal}
          closeModal={() => handleShowNotesModal(false)}
          onSubmit={(event) => onHandleChangeNotes(event)}
          defaultValue={notes}
        />
      )}
    </>
  );
};

export default FooterCartAction;
