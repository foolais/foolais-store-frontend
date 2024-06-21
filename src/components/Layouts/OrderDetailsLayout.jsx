import { AiOutlineEdit, AiOutlineFileAdd } from "react-icons/ai";
import Button from "../Elements/Button/Button";
import CardAddNew from "../Fragments/Card/CardAddNew";
import CardCart from "../Fragments/Card/CardCart";
import useOrder from "../../hooks/useOrder";
import NotesModal from "../Fragments/Modal/NotesModal";
import useCart from "../../hooks/useCart";
import FooterOrderDetails from "../Fragments/Footer/FooterOrderDetails";
import Breadcrumbs from "../Fragments/Breadcrumbs";
import Title from "../Elements/Text/Title";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const OrderDetailsLayout = () => {
  const { id } = useParams();
  const {
    singleOrder: order,
    onEdit,
    showModal,
    onToggleOnEdit,
    onHandleAddNotes,
    handleShowModal,
    getSingleOrderData,
  } = useOrder();
  const { onDeleteCart } = useCart();

  const breadCrumbsData = [
    { text: "Home", link: "/" },
    { text: "Pesanan", link: "/pesanan" },
    { text: "Detail", link: `/pesanan/${id}` },
  ];

  useEffect(() => {
    if (!order || !order?._id) {
      getSingleOrderData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-auto">
      <Title>Detail Pesanan</Title>
      <Breadcrumbs data={breadCrumbsData} />
      <div className="flex items-start justify-between">
        <div className="grid">
          <div className="flex items-center">
            <p className="font-bold text-2xl mb-1">
              {`Pesanan #${order?.number_order}`}
            </p>
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
            Status :{" "}
            <span className="font-semibold">
              {order?.is_finished ? "Selesai" : "Menunggu"}
            </span>
          </p>
        </div>
        <div className="grid text-right">
          <p className="font-semibold text-lg mb-1">
            Meja : {order?.table?.name}
          </p>
          <Button
            onClick={() => handleShowModal(true)}
            className={`btn-sm btn-outline text-secondary font-bold border-[1px] border-secondary hover:bg-secondary hover:border-secondary ease-in-out duration-300`}
          >
            {order?.is_finished ? "Lihat Catatan" : "Tambah Catatan"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-4 gap-4">
        {order?.menu &&
          order?.menu.length > 0 &&
          order?.menu.map((item) => {
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
          cardClassName="h-auto min-h-44 p-2 min-w-48"
          titleClassName="font-semibold text-center text-[1rem] md:text-md mt-6 md:mt-4"
          actionClassName="mt-2 md:mt-4"
          onEdit={!onEdit}
        />
      </div>
      <NotesModal
        title={`Catatan Untuk Pesanan #${1}`}
        showModal={showModal}
        closeModal={() => handleShowModal(false)}
        defaultValue={order?.notes}
        onSubmit={(event) => onHandleAddNotes(event)}
        statusOrder={order?.is_finished}
      />
      <FooterOrderDetails totalPrice={order?.total_price} />
    </div>
  );
};

export default OrderDetailsLayout;
