/* eslint-disable react/prop-types */
import FormCart from "../Form/FormCart";
import Modal from "./Modal";

const CartModal = (props) => {
  const { showModal, closeModal, defaultValue, onSubmit } = props;

  return (
    <Modal title="Ubah Pesanan" showModal={showModal} closeModal={closeModal}>
      <FormCart onSubmit={onSubmit} defaultValue={defaultValue} />
    </Modal>
  );
};

export default CartModal;
