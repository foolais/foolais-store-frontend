import { useSelector, useDispatch } from "react-redux";
import {
  getCartData,
  getCartStatus,
  handleChangeNotes,
} from "../../redux/slice/cartSlice";
import { useState, useEffect } from "react";
import Card from "../Fragments/Card";
import Button from "../Elements/Button/Button";
import { AiOutlineEdit } from "react-icons/ai";

const CardCartLayout = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(getCartData);
  const cartStatus = useSelector(getCartStatus);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (cartStatus === "idle") setCart(cartData);
  }, [cartStatus, cartData]);

  const isNotesFilled = (notes) => {
    return notes && notes.length > 0 ? true : false;
  };

  const handleSubmitFormNotes = (event, _id, is_take_away) => {
    event.preventDefault();
    const notes = event.target.notes.value;
    dispatch(handleChangeNotes({ _id, is_take_away, notes }));
  };

  return (
    <div className="w-full h-auto">
      <div className="flex items-center justify-around lg:justify-between flex-wrap gap-8">
        {cart && cart.length > 0 ? (
          cart.map((item) => {
            return (
              <Card key={item._id}>
                <div className="card-body">
                  {/* Judul */}
                  <Card.Title
                    title={`x${item.quantity} ${item.name}`}
                    className="font-semibold"
                  />
                  {/* Tipe Makan */}
                  <p>
                    {item.is_take_away ? "Dibawa Pulang" : "Makan Ditempat"}
                  </p>
                  {/* Harga */}
                  <Card.Price
                    price={item.price * item.quantity}
                    className="text-lg"
                  />
                  <div className="card-actions justify-between">
                    {/* Edit */}
                    <div className="tooltip tooltip-top" data-tip="Edit">
                      <Button className="btn-sm btn-circle btn-ghost">
                        <AiOutlineEdit size={20} />
                      </Button>
                    </div>
                    {/* Notes */}
                    <Card.Notes
                      data={item.notes}
                      textButton={`${
                        isNotesFilled(item.notes) ? "Lihat" : "Tambah"
                      } Catatan`}
                      title={`${
                        isNotesFilled(item.notes)
                          ? "Catatan "
                          : "Tambah Catatan "
                      } untuk ${item.name}`}
                      btnClassName="btn-sm btn-outline"
                      onSubmit={(event) =>
                        handleSubmitFormNotes(
                          event,
                          item._id,
                          item.is_take_away
                        )
                      }
                    />
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="w-full flex items-center justify-center text-neutral p-4 font-semibold">
            Tidak Ada Data di Keranjang
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCartLayout;
