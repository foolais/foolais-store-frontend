/* eslint-disable react/prop-types */
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../../Elements/Button/Button";
import Card from "../Card/Card";
import CartModal from "../Modal/CartModal";
import useCart from "../../../hooks/useCart";
import useOrder from "../../../hooks/useOrder";

const CardCart = (props) => {
  const {
    item,
    onDeleteCart,
    isDisabledAction = false,
    isUseInCart = true,
  } = props;

  const { showEditModal, handleShowEditModal, onUpdateCart } = useCart();
  const { loading, singleOrder, onToggleHandleServedMenu } = useOrder();

  const handleCheck = (payload) => {
    if (!singleOrder?.is_finished) onToggleHandleServedMenu(payload);
  };

  return (
    <>
      <Card className="min-w-48 h-auto lg:min-h-[12.5rem] xl:min-h-[11.5rem]">
        <div
          className={`card-body justify-between ${
            item.is_served ? "bg-secondary text-white" : "bg-white"
          }`}
        >
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
              onClick={() => onDeleteCart(item, isUseInCart)}
            >
              <AiOutlineDelete />
            </Button>
          </div>

          {/* FOOTER */}
          <div className="card-actions grid items-end">
            <div className="flex flex-col gap-2 my-1">
              {/* Tipe Makanan */}
              <p className="text-sm">
                Tipe :{" "}
                <span className="font-semibold">
                  {item.is_take_away ? "Dibawa Pulang" : "Makan Ditempat"}
                </span>
              </p>
              {/* Harga */}
              <Card.Price
                price={item.price * item.quantity}
                className="text-sm md:text-lg font-bold"
              />
            </div>

            <div className="justify-self-end">
              {!isUseInCart &&
                isDisabledAction &&
                (loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <label
                    className={`cursor-pointer label gap-2 p-0 pb-2 ${
                      isDisabledAction ? "opacity-100" : "opacity-0 scale-0"
                    } ease-in-out`}
                  >
                    <span
                      className={`label-text ${item.is_served && "text-white"}`}
                    >
                      Disajikan
                    </span>
                    <input
                      type="checkbox"
                      checked={item.is_served}
                      className="checkbox checkbox-success"
                      onChange={() => handleCheck(item)}
                    />
                  </label>
                ))}
              <Button
                onClick={() => handleShowEditModal(true)}
                className={`btn-sm btn-outline ${
                  isDisabledAction
                    ? "opacity-0 scale-0 hidden"
                    : "block opacity-100"
                } ease-in-out duration-300`}
              >
                Ubah Pesanan
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {showEditModal && (
        <CartModal
          showModal={showEditModal}
          closeModal={() => handleShowEditModal(false)}
          defaultValue={item}
          onSubmit={(event) => onUpdateCart(event, item._id, isUseInCart)}
        />
      )}
    </>
  );
};

export default CardCart;
