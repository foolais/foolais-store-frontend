/* eslint-disable react/prop-types */
import FormAddMenu from "../Form/FormAddMenu";
import Modal from "./Modal";

const AddMenuModal = (props) => {
  const { showModal, closeModal } = props;

  return (
    <Modal
      title="Tambah Pesanan baru"
      showModal={showModal}
      closeModal={closeModal}
    >
      <FormAddMenu />
    </Modal>
  );
};

export default AddMenuModal;
