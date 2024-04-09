import CardMenu from "../Fragments/CardMenu";
import { useEffect } from "react";
// import Button from "../Elements/Button/Button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMenuData,
  getMenuStatus,
  handleSelectedMenu,
} from "../../redux/slice/menuSlice";
import { getSearchData } from "../../redux/slice/searchBarSlice";

const CardMenuLayout = () => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState();
  const dataMenu = useSelector(getMenuData);
  const statusMenu = useSelector(getMenuStatus);
  const searchData = useSelector(getSearchData);

  useEffect(() => {
    if (statusMenu === "idle") {
      setMenu(dataMenu);
    }
  }, [statusMenu, dataMenu]);

  useEffect(() => {
    if (searchData) {
      const filteredMenu = dataMenu.filter((item) =>
        item.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setMenu(filteredMenu);
    } else {
      setMenu(dataMenu);
    }
  }, [searchData, dataMenu]);

  return (
    <div className="w-full h-auto">
      <div className="flex items-center justify-around sm:justify-between flex-wrap gap-8">
        {menu && menu.length > 0 ? (
          menu.map((item) => {
            return (
              <CardMenu
                key={item._id}
                onClick={() => dispatch(handleSelectedMenu(item._id))}
                className="cursor-pointer hover:scale-105 duration-300"
              >
                <CardMenu.Figure
                  src="https://picsum.photos/200"
                  alt={item.name}
                />
                <div
                  className={`card-body ${
                    item.is_selected && "bg-accent text-secondary"
                  }`}
                >
                  <CardMenu.Title title={item.name} className="font-semibold" />
                  <CardMenu.Price price={item.price} className="text-lg" />
                </div>
              </CardMenu>
            );
          })
        ) : (
          <div className="w-full flex items-center justify-center text-neutral p-4 font-semibold">
            {`Tidak Ada Menu Untuk "${searchData}" `}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardMenuLayout;
