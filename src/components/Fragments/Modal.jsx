/* eslint-disable react/prop-types */
import Button from "../Elements/Button/Button";

const Modal = (props) => {
  const { children, title, showModal, closeModal } = props;

  return (
    <>
      <dialog className={`modal z-50 ${showModal && "modal-open"}`}>
        <div className="modal-box">
          <form method="dialog">
            <Button
              className="btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              X
            </Button>
          </form>
          <h3 className="font-bold text-lg mb-4">{title}</h3>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
