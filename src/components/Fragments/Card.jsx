import Modal from "../Fragments/Modal/Modal";
import TextArea from "../Elements/Input/TextArea";
import Button from "../Elements/Button/Button";
import { formatRupiah } from "../../utils/utils";
import { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";

/* eslint-disable react/prop-types */
const CardMenu = ({ children, className, onClick = () => {} }) => {
  return (
    <div
      className={`card card-compact bg-white shadow-lg text-primary min-w-[45%] sm:min-w-[30%] overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Figure = ({ src, alt }) => {
  return (
    <figure>
      <img src={src} alt={alt} className="w-full max-h-[180px]" />
    </figure>
  );
};

const Title = ({ title, className }) => {
  return <h3 className={`card-title ${className}`}>{title}</h3>;
};

const Price = ({ price, className }) => {
  return <p className={`card-price ${className}`}>{formatRupiah(price)}</p>;
};

const Notes = (props) => {
  const { data, textButton, title, btnClassName, disabled, onSubmit } = props;
  const [showModal, setShowModal] = useState(false);

  const handleModal = (type) => {
    setShowModal(type);
  };

  const handleSubmitForm = (event) => {
    onSubmit(event);
    setShowModal(false);
  };

  return (
    <>
      <Button
        className={btnClassName}
        onClick={() => handleModal(true)}
        disabled={disabled}
      >
        {textButton}
      </Button>
      <Modal
        textButton={textButton}
        title={title}
        btnClassName={btnClassName}
        showModal={showModal}
        closeModal={() => handleModal(false)}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <TextArea
            name="notes"
            className="textarea textarea-bordered textarea-md"
            defaultValue={data}
          />
          <Button className="bg-secondary text-white w-full mt-4">
            Simpan
          </Button>
        </form>
      </Modal>
    </>
  );
};

const Type = ({ id, isTakeAway, handleIsTakeAway, disabled }) => {
  const classButton = `btn-sm md:w-[48%]`;
  return (
    <div className="flex md:justify-between gap-2 w-full">
      <Button
        className={`${classButton} ${
          isTakeAway ? "bg-secondary text-neutral" : "bg-neutral text-primary"
        } `}
        onClick={() => handleIsTakeAway(id, false)}
        disabled={disabled}
      >
        <AiOutlineShoppingCart />
        <span>Dine-in</span>
      </Button>
      <Button
        className={`${classButton} ${
          isTakeAway ? "bg-neutral" : "bg-secondary "
        } border-none text-primary `}
        onClick={() => handleIsTakeAway(id, true)}
        disabled={disabled}
      >
        <AiOutlineHome />
        <span>Take away</span>
      </Button>
    </div>
  );
};

const Category = ({ category, bgColor }) => {
  return (
    <div className={`badge ${bgColor} text-primary font-medium`}>
      {category}
    </div>
  );
};

CardMenu.Figure = Figure;
CardMenu.Title = Title;
CardMenu.Price = Price;
CardMenu.Notes = Notes;
CardMenu.Type = Type;
CardMenu.Category = Category;

export default CardMenu;
