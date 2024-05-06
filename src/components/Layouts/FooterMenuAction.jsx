import Counter from "../Fragments/Counter";
import Divider from "../Elements/Divider/Divider";
import Card from "../Fragments/Card";
import Button from "../Elements/Button/Button";
import { AiOutlineRight } from "react-icons/ai";
import Modal from "../Fragments/Modal";
import FormMenu from "../Fragments/FormMenu";
import FooterLayout from "./Footer/FooterLayout";
import useFooterMenu from "../../hooks/useFooterMenu";

const FooterMenuAction = () => {
  const {
    selectedMenu,
    tableCart,
    updateMenuModal,
    setUpdateMenuModal,
    handleChangeQuantity,
    handleIsTakeAway,
    handleSubmitFormNotes,
    onUpdateMenu,
    onCloseModal,
    getTitleData,
    resetTableCart,
    onAddToCart,
  } = useFooterMenu();

  return (
    <FooterLayout
      title={getTitleData()}
      isWithCloseBtn={tableCart !== null}
      onClickCloseBtn={resetTableCart()}
    >
      {/* LEFT */}
      {/* Counter */}
      <Counter
        value={selectedMenu ? selectedMenu?.quantity : 1}
        className="ml-2 pt-2"
        handleCounter={handleChangeQuantity}
        disabled={!selectedMenu?.name}
      />
      {/* MID*/}
      <Divider className="divider-horizontal ml-0.5 mr-0.5" />
      <div className="flex flex-col gap-2 justify-center pt-2">
        {/* Tipe */}
        <Card.Type
          id={selectedMenu?._id}
          isTakeAway={selectedMenu?.is_take_away}
          handleIsTakeAway={handleIsTakeAway}
          disabled={!selectedMenu?.name}
        />
        {/* Catatan */}
        <Card.Notes
          data={selectedMenu?.notes}
          textButton={`${
            selectedMenu?.notes && selectedMenu?.notes.length > 1
              ? "Lihat"
              : "Tambah"
          } Catatan`}
          title="Catatan"
          btnClassName="btn-sm bg-secondary text-primary border-0"
          disabled={!selectedMenu?.name}
          onSubmit={handleSubmitFormNotes}
        />
      </div>
      <Divider className="divider-horizontal ml-0.5 mr-0.5" />
      {/* RIGHT */}
      <div className="flex flex-col items-center pt-2 gap-2">
        {/* Button Delete Menu */}
        <Button
          className="bg-secondary text-primary border-none"
          disabled={!selectedMenu?.name}
          onClick={() => setUpdateMenuModal(true)}
        >
          Ubah Menu
          <AiOutlineRight size={15} />
        </Button>
        {/* Button Add */}
        <Button
          className="bg-secondary text-primary border-none"
          disabled={!selectedMenu?.name}
          onClick={onAddToCart}
        >
          Tambah Pesanan
          <AiOutlineRight size={15} />
        </Button>
      </div>
      {/* Modal Update Menu  */}
      <Modal
        key={selectedMenu?._id}
        title={`Ubah Menu Untuk ${selectedMenu?.name}`}
        showModal={updateMenuModal}
        closeModal={() => onCloseModal()}
      >
        <FormMenu
          isEdit={true}
          btnText="Ubah Menu"
          defaultValue={selectedMenu}
          onSubmit={(event) => onUpdateMenu(event, selectedMenu._id)}
        />
      </Modal>
    </FooterLayout>
  );
};

export default FooterMenuAction;
