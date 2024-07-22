import Button from "../Elements/Button/Button";
import { AiFillWarning } from "react-icons/ai";
import useCart from "../../hooks/useCart";
import CardCart from "../Fragments/Card/CardCart";
import NotesModal from "../Fragments/Modal/NotesModal";
import FooterCartAction from "../Fragments/Footer/FooterCartAction";
import Title from "../Elements/Text/Title";
import Breadcrumbs from "../Fragments/Breadcrumbs";
import Skeleton from "../Fragments/Skeleton/Skeleton";

const CardCartLayout = () => {
  const {
    cart,
    notes,
    loading,
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
        className={`grid md:grid-cols-2 gap-4 mt-2 mb-4 ${
          cart && cart.length === 0 && "hidden"
        }`}
      >
        {cart && cart.length > 0 && (
          <Button
            className="font-semibold btn-outline btn-error btn-sm justify-self-start"
            onClick={handleDeleteAllCart}
          >
            <AiFillWarning />
            Hapus Semua Keranjang
          </Button>
        )}
        <Button
          onClick={() => handleShowNotesModal(true)}
          className="btn-sm btn-outline text-secondary font-bold border-[1px] border-secondary hover:bg-secondary hover:border-secondary ease-in-out duration-300 w-max md:justify-self-end"
        >
          {isNotesFilled() ? "Ubah Catatan" : "Tambah Catatan"}
        </Button>
      </div>
      <div className="lg:flex lg:justify-between lg:gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-40 lg:my-4 lg:h-auto lg:max-h-[calc(100vh-15rem)] lg:overflow-auto lg:pr-4 lg:pb-4 lg:w-full">
          {cart && cart.length === 0 && !loading ? (
            <div className="flex items-center justify-center  text-primary p-4 font-semibold col-span-full">
              Tidak Ada Pesanan di Keranjang
            </div>
          ) : loading ? (
            <Skeleton.List total={4} className="min-w-48 min-h-36" />
          ) : (
            cart &&
            cart.length > 0 &&
            cart.map((item) => {
              return (
                <CardCart
                  key={item.name + item.is_take_away}
                  item={item}
                  onDeleteCart={onDeleteCart}
                />
              );
            })
          )}
        </div>
        {cart && cart?.length > 0 && <FooterCartAction />}
        {showNotesModal && (
          <NotesModal
            title="Tambah Catatan"
            showModal={showNotesModal}
            closeModal={() => handleShowNotesModal(false)}
            onSubmit={(event) => onHandleChangeNotes(event)}
            defaultValue={notes}
          />
        )}
      </div>
    </div>
  );
};

export default CardCartLayout;
