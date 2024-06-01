/* eslint-disable react/prop-types */
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Button from "../../Elements/Button/Button";
import Card from "../Card";
import useCart from "../../../hooks/useCart";

const CardCart = (props) => {
  const {
    item,
    onDeleteCart,
    handleSubmitFormNotes,
    isDisabledAction = false,
  } = props;

  const { isNotesFilled } = useCart();

  console.log({ isDisabledAction });

  return (
    <Card>
      <div className="card-body">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          {/* Judul */}
          <Card.Title
            title={`${item.name} x${item.quantity} `}
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
        <p>{item.is_take_away ? "Dibawa Pulang" : "Makan Ditempat"}</p>
        {/* Harga */}
        <Card.Price price={item.price * item.quantity} className="text-lg" />
        {/* FOOTER */}
        <div className="card-actions justify-between">
          <div
            className={`tooltip tooltip-top ${
              isDisabledAction ? "opacity-0 scale-0" : "opacity-100"
            } ease-in-out duration-300`}
            data-tip="Edit"
          >
            <Button className="btn-sm btn-circle btn-ghost">
              <AiOutlineEdit size={20} />
            </Button>
          </div>
          <Card.Notes
            data={item.notes}
            textButton={`${
              isNotesFilled(item.notes) ? "Lihat" : "Tambah"
            } Catatan`}
            title={`${
              isNotesFilled(item.notes) ? "Catatan " : "Tambah Catatan "
            } untuk ${item.name}`}
            btnClassName={`btn-sm btn-outline ${
              isDisabledAction ? "opacity-0 scale-0" : "opacity-100"
            } ease-in-out duration-300`}
            onSubmit={(event) =>
              handleSubmitFormNotes(event, item._id, item.is_take_away)
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default CardCart;
