/* eslint-disable react/prop-types */
import FormTableEdit from "../Form/FormTableEdit";
import Modal from "./Modal";

const TableEditModal = (props) => {
  const { showModal, closeModal } = props;

  return (
    <Modal
      textButton="Edit Meja"
      title="Edit Meja Pesanan"
      closeModal={closeModal}
      showModal={showModal}
    >
      <FormTableEdit closeModal={closeModal} />
    </Modal>
  );
};

export default TableEditModal;
