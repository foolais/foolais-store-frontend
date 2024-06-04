import { AiOutlineEdit, AiOutlineFileAdd } from "react-icons/ai";
import Button from "../Elements/Button/Button";
import CardAddNew from "../Fragments/CardAddNew";
import CardCart from "../Fragments/Card/CardCart";
import useOrder from "../../hooks/useOrder";
import ModalNotes from "../Fragments/Modal/ModalNotes";
import useCart from "../../hooks/useCart";

const OrderDetailsLayout = () => {
  const {
    data,
    onEdit,
    showModal,
    onToggleOnEdit,
    onHandleAddNotes,
    handleShowModal,
  } = useOrder();

  const { onDeleteCart } = useCart();

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="grid">
          <div className="flex items-center">
            <p className="font-bold text-2xl mb-1">Pesanan #1</p>
            <div
              className="tooltip tooltip-right"
              data-tip={onEdit ? "Simpan Perubahan" : "Edit Pesanan"}
            >
              <Button
                onClick={onToggleOnEdit}
                className="btn-sm btn-circle btn-ghost"
              >
                {onEdit ? (
                  <AiOutlineFileAdd size={20} />
                ) : (
                  <AiOutlineEdit size={20} />
                )}
              </Button>
            </div>
          </div>
          <p>
            Status : <span className="font-semibold">Selesai</span>
          </p>
        </div>
        <div className="grid text-right">
          <p className="font-semibold text-lg mb-1">Meja : 2</p>
          <Button
            onClick={() => handleShowModal(true)}
            className={`btn-sm btn-outline text-secondary font-bold border-[1px] border-secondary hover:bg-secondary hover:border-secondary ease-in-out duration-300 ${
              onEdit ? "opacity-100" : "opacity-0 scale-0"
            }`}
          >
            Tambah Catatan
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4 gap-4">
        {data?.menu &&
          data?.menu.map((item) => {
            return (
              <CardCart
                key={item._id}
                item={item}
                isDisabledAction={!onEdit}
                isUseInCart={false}
                onDeleteCart={onDeleteCart}
              />
            );
          })}
        <CardAddNew
          title="Tambah Pesanan Baru"
          cardClassName={`min-h-auto h-40 min-w-48 ${
            onEdit ? "mb-52" : "mb-0"
          }`}
          titleClassName="font-semibold mt-10"
          actionClassName="mt-4"
          onEdit={!onEdit}
        />
      </div>
      <ModalNotes
        title={`Catatan Untuk Pesanan #${1}`}
        showModal={showModal}
        closeModal={() => handleShowModal(false)}
        defaultValue={data}
        onSubmit={(event) => onHandleAddNotes(event)}
      />
    </>
  );
};

export default OrderDetailsLayout;
