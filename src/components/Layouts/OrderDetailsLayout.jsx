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

const OrderDetailsLayout = () => {
  const {
    data,
    onEdit,
    showModal,
    onToggleOnEdit,
    onHandleAddNotes,
    handleShowModal,
    isNotesFilled,
  } = useOrder();

  const { onDeleteCart } = useCart();

  const { id } = useParams();

  const breadCrumbsData = [
    { text: "Home", link: "/" },
    { text: "Pesanan", link: "/pesanan" },
    { text: "Detail", link: `/pesanan/${id}` },
  ];

  return (
    <div className="w-full h-auto">
      <Title>Detail Pesanan</Title>
      <Breadcrumbs data={breadCrumbsData} />
      <div className="flex items-start justify-between">
        <div className="grid">
          <div className="flex items-center">
            <p className="font-bold text-2xl mb-1">
              {`Pesanan #${data.sequenceNumber}`}
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
              {data.is_finished ? "Selesai" : "Menunggu"}
            </span>
          </p>
        </div>
        <div className="grid text-right">
          <p className="font-semibold text-lg mb-1">Meja : {data.table}</p>
          <Button
            onClick={() => handleShowModal(true)}
            className={`btn-sm btn-outline text-secondary font-bold border-[1px] border-secondary hover:bg-secondary hover:border-secondary ease-in-out duration-300`}
          >
            {isNotesFilled() || data.is_finished
              ? "Lihat Catatan"
              : "Tambah Catatan"}
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
      <NotesModal
        title={`Catatan Untuk Pesanan #${1}`}
        showModal={showModal}
        closeModal={() => handleShowModal(false)}
        defaultValue={data.notes}
        onSubmit={(event) => onHandleAddNotes(event)}
        statusOrder={data.is_finished}
      />
      <FooterOrderDetails data={data} />
    </div>
  );
};

export default OrderDetailsLayout;
