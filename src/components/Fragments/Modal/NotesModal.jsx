/* eslint-disable react/prop-types */
import FormNotes from "../Form/FormNotes";
import Modal from "./Modal";

const NotesModal = (props) => {
  const {
    title,
    showModal,
    closeModal,
    defaultValue,
    onSubmit,
    isDisabled = false,
  } = props;

  return (
    <Modal title={title} showModal={showModal} closeModal={closeModal}>
      <FormNotes
        defaultValue={defaultValue}
        onSubmit={onSubmit}
        isDisabled={isDisabled}
      />
    </Modal>
  );
};

export default NotesModal;
