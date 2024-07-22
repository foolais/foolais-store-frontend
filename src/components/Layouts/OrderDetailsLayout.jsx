import {
  AiFillWarning,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineFileAdd,
} from "react-icons/ai";
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
import useTable from "../../hooks/useTable";
import useLocalStorage from "../../hooks/useLocalStorage";
import AddMenuModal from "../Fragments/Modal/AddMenuModal";
import { formatDates, isLessThanOneDay } from "../../utils/utils";
import TableEditModal from "../Fragments/Modal/TableEditModal";

const OrderDetailsLayout = () => {
  const { id } = useParams();
  const {
    singleOrder: order,
    onEdit,
    showModal,
    showAddMenuOrderModal,
    showTableEditModal,
    setShowTableEditModal,
    onToggleOnEdit,
    onHandleAddNotes,
    handleShowModal,
    getSingleOrderData,
    isDetailsOpenFromTableMenu,
    onHandleActionEditOrder,
    onDeleteOrder,
  } = useOrder();
  const { onDeleteCart } = useCart();
  const { getOrderByTableId } = useTable();

  const isOpenFromTable = isDetailsOpenFromTableMenu();
  const isValidAction = isLessThanOneDay(order?.timestamps?.created_at);

  const [tempSingleOrder, setTempSingleOrder] = useLocalStorage(
    "tempSingleOrder",
    []
  );

  const onHandleChangeMenu = (type) => {
    try {
      switch (type) {
        case "EDIT":
          setTempSingleOrder(order);
          onToggleOnEdit();
          break;
        case "SAVE":
          onHandleActionEditOrder("SAVE", order, () => {
            setTempSingleOrder([]);
            onToggleOnEdit();
          });
          break;
        case "CANCEL":
          onHandleActionEditOrder("CANCEL", tempSingleOrder, () => {
            setTempSingleOrder([]);
            onToggleOnEdit();
          });
          break;
        case "TABLE_EDIT":
          setTempSingleOrder(order);
          setShowTableEditModal(true);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const breadCrumbsData = [
    { text: "Home", link: "/" },
    {
      text: isOpenFromTable ? "Meja" : "Pesanan",
      link: isOpenFromTable ? "/meja" : "/pesanan",
    },
    isOpenFromTable ? { text: "Pesanan", link: "/pesanan" } : null,
    { text: "Detail", link: `/pesanan/${id}` },
  ].filter(Boolean);

  useEffect(() => {
    if (!order || !order?._id) {
      if (!isOpenFromTable) {
        getSingleOrderData(id);
      } else {
        getOrderByTableId(id);
      }
    }
    if (onEdit) {
      onToggleOnEdit();
      setTempSingleOrder([]);
    }

    return () => {
      if (onEdit) {
        onToggleOnEdit();
        setTempSingleOrder([]);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-auto">
      <Title>Detail Pesanan</Title>
      <Breadcrumbs data={breadCrumbsData} />
      <div className="flex items-start justify-between">
        <div className="grid">
          <div className="flex items-center">
            <p className="font-bold md:text-2xl mb-1">
              {`Pesanan #${order?.number_order}`}
            </p>
            <div
              className={`tooltip tooltip-right ${
                isValidAction ? "block" : "hidden"
              }`}
              data-tip={onEdit ? "Simpan Perubahan" : "Edit Pesanan"}
            >
              <Button
                onClick={() => onHandleChangeMenu(onEdit ? "SAVE" : "EDIT")}
                className="btn-sm btn-circle bg-secondary text-white mx-2"
              >
                {onEdit ? (
                  <AiOutlineFileAdd size={20} />
                ) : (
                  <AiOutlineEdit size={20} />
                )}
              </Button>
            </div>
            {onEdit && isValidAction && (
              <div className="tooltip tooltip-right" data-tip="Batal Perubahan">
                <Button
                  onClick={() => onHandleChangeMenu("CANCEL")}
                  className="btn-sm btn-circle bg-red-500 text-white"
                >
                  <AiOutlineClose size={20} />
                </Button>
              </div>
            )}
          </div>
          <p>
            Status :{" "}
            <span className="font-bold">
              {order?.is_finished ? "Selesai" : "Dalam Proses"}
            </span>
          </p>
        </div>
        <div className="grid text-right">
          <div className="flex items-center justify-end mb-2 gap-2">
            <p className="font-semibold md:text-lg">
              Meja : {order?.table?.name}
            </p>
            {onEdit && (
              <div
                className="btn-sm btn-circle bg-secondary text-white flex items-center justify-center cursor-pointer hover:bg-gray-300"
                onClick={() => onHandleChangeMenu("TABLE_EDIT")}
              >
                <AiOutlineEdit size={20} />
              </div>
            )}
          </div>
          <p className="font-semibold md:text-lg mb-2">
            {formatDates(order?.timestamps?.created_at)}
          </p>
        </div>
      </div>
      <div className={`flex ${onEdit ? "justify-between" : "justify-end"}`}>
        {onEdit && (
          <Button
            onClick={() => onDeleteOrder(order?._id)}
            className="font-semibold btn-error btn-sm text-white"
          >
            <AiFillWarning />
            Hapus Pesanan
          </Button>
        )}
        <Button
          onClick={() => handleShowModal(true, "notes")}
          className={`btn-sm btn-outline text-secondary font-bold border-[1px] border-secondary hover:bg-secondary hover:border-secondary ease-in-out duration-300`}
        >
          {onEdit ? "Ubah Catatan" : "Lihat Catatan"}
        </Button>
      </div>
      <div className="lg:flex lg:justify-between lg:gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-4 gap-4 mb-52 lg:h-auto lg:max-h-[calc(100vh-260px)] lg:overflow-auto lg:pr-4 lg:pb-12 lg:w-full">
          {order?.menu &&
            order?.menu.length > 0 &&
            order?.menu.map((item) => {
              return (
                <CardCart
                  key={`${item._id}-${
                    item.is_take_away ? "take-away" : "dine-in"
                  }`}
                  item={item}
                  isDisabledAction={!onEdit}
                  isUseInCart={false}
                  onDeleteCart={onDeleteCart}
                />
              );
            })}
          {onEdit && (
            <CardAddNew
              title="Tambah Pesanan Baru"
              cardClassName="h-auto min-h-44 p-2 min-w-48"
              titleClassName="font-semibold text-center text-[1rem] text-lg lg:text-xl"
              actionClassName="mt-2 md:mt-4"
              onEdit={!onEdit}
              btnOnClick={() => handleShowModal(true, "addMenu")}
            />
          )}
        </div>
        <FooterOrderDetails order={order} />
      </div>
      {showModal && (
        <NotesModal
          title={`Catatan Untuk Pesanan #${order?.number_order}`}
          showModal={showModal}
          closeModal={() => handleShowModal(false, "notes")}
          defaultValue={order?.notes}
          onSubmit={(event) => onHandleAddNotes(event)}
          isDisabled={!onEdit}
        />
      )}
      {showAddMenuOrderModal && (
        <AddMenuModal
          showModal={showAddMenuOrderModal}
          closeModal={() => handleShowModal(false, "addMenu")}
        />
      )}
      {showTableEditModal && (
        <TableEditModal
          showModal={showTableEditModal}
          closeModal={() => setShowTableEditModal(false)}
        />
      )}
    </div>
  );
};

export default OrderDetailsLayout;
