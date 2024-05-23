/* eslint-disable react/prop-types */
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../../Elements/Button/Button";
import Card from "../Card";

const CardMenu = (props) => {
  const { item, onCardClick, onCardDelete } = props;

  const setCategory = (category) => {
    switch (category) {
      case "food":
        return "Makanan";
      case "drink":
        return "Minuman";
      case "extra":
        return "Tambahan";
      default:
        return "Makanan";
    }
  };

  const setColor = (category) => {
    switch (category) {
      case "food":
        return "bg-primary-badge";
      case "drink":
        return "bg-secondary-badge";
      case "extra":
        return "bg-ternary-badge";
      default:
        return "bg-primary-badge";
    }
  };

  return (
    <Card
      className="cursor-pointer hover:scale-105 duration-300 min-w-48"
      onClick={onCardClick}
    >
      <div
        className={`card-body ${item.is_selected && "bg-primary text-neutral"}`}
      >
        <div className="flex items-start justify-between">
          {/* Nama Menu */}
          <Card.Title title={item.name} className="font-semibold max-w-[80%]" />
          {/* Button Delete */}
          <Button
            className="btn-circle btn-sm btn-error absolute right-4"
            onClick={onCardDelete}
          >
            <AiOutlineDelete />
          </Button>
        </div>
        {/* Harga Menu */}
        <Card.Price price={item.price} className="text-lg" />
        <Card.Category
          category={setCategory(item.category)}
          bgColor={setColor(item.category) || ""}
        />
      </div>
    </Card>
  );
};

export default CardMenu;