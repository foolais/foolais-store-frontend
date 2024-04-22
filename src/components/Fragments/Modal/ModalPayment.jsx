/* eslint-disable react/prop-types */
import FormPayment from "../Form/FormPayment";
import Modal from "../Modal";

const ModalPayment = (props) => {
  const { showModal, closeModal } = props;
  return (
    <Modal
      textButton="Bayar"
      title="Pembayaran"
      showModal={showModal}
      closeModal={closeModal}
    >
      <FormPayment />
    </Modal>
  );
};

export default ModalPayment;
