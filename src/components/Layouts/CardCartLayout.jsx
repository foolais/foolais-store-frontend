import Button from "../Elements/Button/Button";
import { AiFillWarning } from "react-icons/ai";
import useCart from "../../hooks/useCart";
import CardCart from "../Fragments/Card/CardCart";

const CardCartLayout = () => {
  const { cart, handleSubmitFormNotes, onDeleteCart, handleDeleteAllCart } =
    useCart();

  return (
    <div className="w-full h-auto">
      <Button
        className="font-semibold btn-outline btn-error btn-sm mb-6 justify-end"
        onClick={handleDeleteAllCart}
      >
        <AiFillWarning />
        Hapus Semua Keranjang
      </Button>
      <div className="flex items-center justify-around lg:justify-between flex-wrap gap-8">
        {cart && cart.length > 0 ? (
          cart.map((item) => {
            return (
              <CardCart
                key={item.name}
                item={item}
                handleSubmitFormNotes={handleSubmitFormNotes}
                onDeleteCart={onDeleteCart}
              />
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
