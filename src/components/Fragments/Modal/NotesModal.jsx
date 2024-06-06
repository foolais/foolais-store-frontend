/* eslint-disable react/prop-types */
import FormNotes from "../Form/FormNotes";
import Modal from "./Modal";

const NotesModal = (props) => {
  const { title, showModal, closeModal, defaultValue, onSubmit } = props;

  return (
    <Modal title={title} showModal={showModal} closeModal={closeModal}>
      <FormNotes defaultValue={defaultValue} onSubmit={onSubmit} />
    </Modal>
  );
};

export default NotesModal;
