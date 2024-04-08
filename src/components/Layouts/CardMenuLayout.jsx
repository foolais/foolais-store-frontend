import CardMenu from "../Fragments/CardMenu";
import Button from "../Elements/Button/Button";

const menu = [
  {
    _id: 1,
    name: "Soto",
    price: 10000,
    quantity: 1,
    is_take_away: false,
    is_available: true,
    category: "Food",
    notes: "",
  },
  {
    _id: 2,
    name: "Bakso",
    price: 10000,
    quantity: 1,
    is_take_away: false,
    is_available: true,
    category: "Food",
    notes: "",
  },
  {
    _id: 3,
    name: "Bakso",
    price: 10000,
    quantity: 1,
    is_take_away: false,
    is_available: true,
    category: "Food",
  },
];

const CardMenuLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center sm:justify-between flex-wrap gap-8">
        {menu.map((item) => {
          return (
            <CardMenu key={item._id}>
              <CardMenu.Figure
                src="https://picsum.photos/200"
                alt={item.name}
              />
              <div className="card-body over">
                <CardMenu.Title title={item.name} className="font-semibold" />
                <CardMenu.Price price={item.price} className="text-lg" />
                <div className="card-actions justify-end mt-4">
                  <Button className=" btn-accent">{">"}</Button>
                </div>
              </div>
            </CardMenu>
          );
        })}
      </div>
    </div>
  );
};

export default CardMenuLayout;
