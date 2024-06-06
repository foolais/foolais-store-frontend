import Button from "../Elements/Button/Button";
import { AiFillWarning } from "react-icons/ai";
import useCart from "../../hooks/useCart";
import CardCart from "../Fragments/Card/CardCart";
import NotesModal from "../Fragments/Modal/NotesModal";
import FooterCartAction from "../Fragments/Footer/FooterCartAction";
import Title from "../Elements/Text/Title";
import Breadcrumbs from "../Fragments/Breadcrumbs";

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

  const breadcrumbsData = [
    { text: "Home", link: "/" },
    { text: "Keranjang", link: "/keranjang" },
  ];

  return (
    <div className="w-full h-auto">
      <Title>Keranjang</Title>
      <Breadcrumbs data={breadcrumbsData} />
      <div
        className={`flex items-center justify-between mb-6 ${
          cart.length === 0 && "hidden"
        }`}
      >
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
          {isNotesFilled() ? "Ubah Catatan" : "Tambah Catatan"}
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
      <NotesModal
        title="Tambah Catatan"
        showModal={showNotesModal}
        closeModal={() => handleShowNotesModal(false)}
        onSubmit={(event) => onHandleChangeNotes(event)}
        defaultValue={notes}
      />
      <FooterCartAction />
    </div>
  );
};

export default CardCartLayout;
