import BadgeStatus from "../Fragments/BadgeStatus";
import CardAddNew from "../Fragments/Card/CardAddNew";
import Modal from "../Fragments/Modal/Modal";
import FormTable from "../Fragments/Form/FormTable";
import CardTable from "../Fragments/Card/CardTable";
import useTable from "../../hooks/useTable";
import Breadcrumbs from "../Fragments/Breadcrumbs";
import Title from "../Elements/Text/Title";

const CardTableLayout = () => {
  const {
    table,
    addTableModal,
    setAddTableModal,
    selectedTable,
    editTableModal,
    onClickEdit,
    onAddTable,
    onUpdateTable,
    onDeleteTable,
    onCloseModal,
    onAddOrder,
  } = useTable();

  const statusData = [
    { text: "Kosong", color: "success" },
    { text: "Menunggu", color: "warning" },
    { text: "Makan", color: "info" },
    { text: "Selesai", color: "primary" },
  ];

  const breadCrumbsData = [
    { text: "Home", link: "/" },
    { text: "Meja", link: "/meja" },
  ];

  return (
    <div className="w-full h-auto">
      <Title>Daftar Meja</Title>
      <Breadcrumbs data={breadCrumbsData} />
      {/* Status */}
      <div className="flex items-center text-primary font-semibold gap-4 mb-2">
        <p>Status Meja : </p>
        <BadgeStatus data={statusData} />
      </div>
      {/* Daftar Meja */}
      {(table && table.length === 0) ||
        (!table && (
          <div className="w-full flex items-center justify-center text-primary p-4 font-semibold">
            Tidak ada Data Meja
          </div>
        ))}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Add New Table Card */}
        <CardAddNew
          title="Tambah Meja Baru"
          cardClassName="min-h-36 h-auto min-w-48 justify-center"
          titleClassName="font-semibold"
          actionClassName="mt-4"
          btnOnClick={() => setAddTableModal(true)}
        />
        {/* Add New Table Modal */}
        <Modal
          title="Tambah Meja Baru"
          showModal={addTableModal}
          closeModal={() => onCloseModal("ADD")}
        >
          <FormTable
            onSubmit={(event) => onAddTable(event)}
            btnText="Tambah Meja"
          />
        </Modal>
        {/* Table */}
        {table &&
          table.length > 0 &&
          table.map((item) => {
            return (
              <CardTable
                key={item._id}
                item={item}
                onClickEdit={() => onClickEdit(item)}
                onDeleteTable={() => onDeleteTable(item)}
                onAddOrder={() => onAddOrder(item)}
              />
            );
          })}
      </div>
      {/* Edit Table Modal */}
      <Modal
        key={selectedTable?._id}
        title={`Ubah Meja ${selectedTable?.name}`}
        showModal={editTableModal}
        closeModal={() => onCloseModal("UPDATE")}
      >
        <FormTable
          onSubmit={(event) => onUpdateTable(event)}
          btnText="Ubah Meja"
          defaultValue={selectedTable}
          isEdit={true}
        />
      </Modal>
    </div>
  );
};

export default CardTableLayout;
