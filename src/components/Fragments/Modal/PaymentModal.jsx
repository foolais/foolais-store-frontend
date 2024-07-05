/* eslint-disable react/prop-types */
import FormPayment from "../Form/FormPayment";
import Modal from "./Modal";

const PaymentModal = (props) => {
  const { showModal, closeModal, onSubmit, type = "cash" } = props;

  return (
    <Modal
      textButton="Bayar"
      title="Pembayaran"
      showModal={showModal}
      closeModal={closeModal}
    >
      <FormPayment onSubmit={onSubmit} type={type} />
    </Modal>
  );
};

export default PaymentModal;
