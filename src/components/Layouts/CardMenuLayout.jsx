import CardMenu from "../Fragments/CardMenu";
// import Button from "../Elements/Button/Button";
import { useState } from "react";

const data = [
  {
    _id: 1,
    name: "Soto",
    price: 9000,
    quantity: 1,
    is_take_away: false,
    is_available: true,
    category: "Food",
    notes: "hello",
  },
  {
    _id: 2,
    name: "Bakso",
    price: 10000,
    quantity: 1,
    is_take_away: false,
    is_available: true,
    category: "Food",
    notes: "hello",
  },
  {
    _id: 3,
    name: "Mie",
    price: 8000,
    quantity: 1,
    is_take_away: true,
    is_available: true,
    category: "Food",
    notes: "",
  },
];

const CardMenuLayout = () => {
  const [menu, setMenu] = useState(data);

  // const handleIsTakeAway = (id, type) => {
  //   const updatedMenu = menu.map((item) => {
  //     if (item._id === id) {
  //       return {
  //         ...item,
  //         is_take_away: type,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });

  //   setMenu(updatedMenu);
  // };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-around sm:justify-between flex-wrap gap-8">
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
                {/* <CardMenu.Type
                  id={item._id}
                  isTakeAway={item.is_take_away}
                  handleIsTakeAway={handleIsTakeAway}
                />
                <CardMenu.Notes
                  textButton={`${
                    item.notes && item.notes.length > 1
                      ? "Lihat Catatan"
                      : "Tambah Catatan"
                  }`}
                  title={`Catatan untuk ${item.name}`}
                  btnClassName="btn-sm btn-outline"
                  data={item.notes}
                />
                <div className="card-actions justify-end mt-4">
                  <Button className=" btn-accent">{">"}</Button>
                </div> */}
              </div>
            </CardMenu>
          );
        })}
      </div>
    </div>
  );
};

export default CardMenuLayout;
