/* eslint-disable react/prop-types */
import Button from "../../Elements/Button/Button";

const Modal = (props) => {
  const { children, title, showModal, closeModal } = props;

  return (
    <>
      <dialog
        className={`modal z-[100] ${
          showModal && "modal-open w-screen h-screen"
        }`}
      >
        <div className="modal-box max-h-[90%] min-w-[80%]">
          <form method="dialog">
            <Button
              className="btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              X
            </Button>
          </form>
          <h3 className="font-bold text-xl md:text-2xl mb-4">{title}</h3>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
