import Modal from "./Modal";
import TextArea from "../Elements/Input/TextArea";
import Button from "../Elements/Button/Button";
import { formatRupiah } from "../../utils/utils";
import { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";

/* eslint-disable react/prop-types */
const CardMenu = ({ children, className, onClick = () => {} }) => {
  return (
    <div
      className={`card card-compact bg-neutral min-w-[45%] max-w-[45%] sm:min-w-[30%] overflow-hidden sm:max-w-[30%] ${className}`}
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
  const { data, textButton, title, btnClassName } = props;
  const [showModal, setShowModal] = useState(false);

  const handleModal = (type) => {
    setShowModal(type === "open" ? true : false);
  };

  return (
    <>
      <Button className={btnClassName} onClick={() => handleModal("open")}>
        {textButton}
      </Button>
      <Modal
        textButton={textButton}
        title={title}
        btnClassName={btnClassName}
        showModal={showModal}
        closeModal={() => handleModal("close")}
      >
        <div className=" flex flex-col gap-4 w-4/5">
          <TextArea
            name="notes"
            className="textarea textarea-bordered textarea-md"
            defaultValue={data}
          />
          <Button className="btn-sm btn-neutral w-1/2 ">Simpan</Button>
        </div>
      </Modal>
    </>
  );
};

const Type = ({ id, isTakeAway, handleIsTakeAway }) => {
  const classButton = `btn-sm`;
  return (
    <div className="flex gap-2">
      <Button
        className={`${classButton} ${
          isTakeAway ? "btn-outline" : "btn-active bg-secondary text-neutral"
        } `}
        onClick={() => handleIsTakeAway(id, false)}
      >
        <AiOutlineShoppingCart />
        <span>Dine-in</span>
      </Button>
      <Button
        className={`${classButton} ${
          isTakeAway ? "btn-active bg-secondary text-neutral" : "btn-outline"
        } `}
        onClick={() => handleIsTakeAway(id, true)}
      >
        <AiOutlineHome />
        <span>Take away</span>
      </Button>
    </div>
  );
};

CardMenu.Figure = Figure;
CardMenu.Title = Title;
CardMenu.Price = Price;
CardMenu.Notes = Notes;
CardMenu.Type = Type;

export default CardMenu;
