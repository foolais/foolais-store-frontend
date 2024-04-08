import CardMenu from "../Fragments/CardMenu";
import { useEffect } from "react";
// import Button from "../Elements/Button/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getMenuData, getMenuStatus } from "../../redux/slice/menuSlice";

const CardMenuLayout = () => {
  const [menu, setMenu] = useState();
  const dataMenu = useSelector(getMenuData);
  const statusMenu = useSelector(getMenuStatus);

  useEffect(() => {
    if (statusMenu === "idle") {
      setMenu(dataMenu);
    }
  }, [statusMenu, dataMenu]);

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
        {menu &&
          menu.map((item) => {
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
