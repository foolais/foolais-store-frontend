import Button from "../Elements/Button/Button";
import { AiFillWarning } from "react-icons/ai";
import useCart from "../../hooks/useCart";
import CardCart from "../Fragments/Card/CardCart";
import ModalNotes from "../Fragments/Modal/ModalNotes";

const CardCartLayout = () => {
  const {
    cart,
    notes,
    showNotesModal,
    onDeleteCart,
    handleDeleteAllCart,
    handleShowNotesModal,
    onHandleChangeNotes,
    isNotesFilled,
  } = useCart();

  return (
    <div className="w-full h-auto">
      <div className="flex items-center justify-between mb-6">
        {cart && cart.length > 0 && (
          <Button
            className="font-semibold btn-outline btn-error btn-sm"
            onClick={handleDeleteAllCart}
          >
            <AiFillWarning />
            Hapus Semua Keranjang
          </Button>
        )}
        <Button
          onClick={() => handleShowNotesModal(true)}
          className="btn-sm btn-outline text-secondary font-bold border-[1px] border-secondary hover:bg-secondary hover:border-secondary ease-in-out duration-300"
        >
          {isNotesFilled ? "Ubah Catatan" : "Tambah Catatan"}
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cart && cart.length > 0 ? (
          cart.map((item) => {
            return (
              <CardCart
                key={item.name + item.is_take_away}
                item={item}
                onDeleteCart={onDeleteCart}
              />
            );
          })
        ) : (
          <div className="w-full flex items-center  text-primary font-semibold">
            Tidak Ada Pesanan di Keranjang
          </div>
        )}
      </div>
      <ModalNotes
        title="Tambah Catatan"
        showModal={showNotesModal}
        closeModal={() => handleShowNotesModal(false)}
        onSubmit={(event) => onHandleChangeNotes(event)}
        defaultValue={notes}
      />
    </div>
  );
};

export default CardCartLayout;
