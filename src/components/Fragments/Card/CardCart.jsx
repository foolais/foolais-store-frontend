/* eslint-disable react/prop-types */
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../../Elements/Button/Button";
import Card from "../Card";
import CartModal from "../Modal/CartModal";
import useCart from "../../../hooks/useCart";

const CardCart = (props) => {
  const { item, onDeleteCart, isDisabledAction = false } = props;

  const { showEditModal, handleShowEditModal, onUpdateCart } = useCart();

  return (
    <Card>
      <div className="card-body">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          {/* Judul */}
          <Card.Title
            title={`x${item.quantity} ${item.name}  `}
            className="font-semibold"
          />
          <Button
            className={`btn-circle btn-outline btn-sm btn-error ${
              isDisabledAction ? "opacity-0 scale-0" : "opacity-100"
            } ease-in-out duration-300`}
            onClick={() => onDeleteCart(item)}
          >
            <AiOutlineDelete />
          </Button>
        </div>
        {/* Tipe Makanan */}
        <p className="mb-2">
          Tipe :{" "}
          <span className="font-semibold">
            {item.is_take_away ? "Dibawa Pulang" : "Makan Ditempat"}
          </span>
        </p>

        {/* FOOTER */}
        <div className="card-actions justify-between">
          {/* Harga */}
          <Card.Price price={item.price * item.quantity} className="text-lg" />
          <div
            className={`tooltip tooltip-left ${
              isDisabledAction ? "opacity-0 scale-0" : "opacity-100"
            } ease-in-out duration-300`}
          >
            <Button
              onClick={() => handleShowEditModal(true)}
              className="btn-sm btn-outline"
            >
              Ubah Pesanan
            </Button>
          </div>
        </div>
      </div>
      <CartModal
        showModal={showEditModal}
        closeModal={() => handleShowEditModal(false)}
        defaultValue={item}
        onSubmit={(event) => onUpdateCart(event, item._id)}
      />
    </Card>
  );
};

export default CardCart;
