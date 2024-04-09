import Button from "../Elements/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineTable,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineUser,
} from "react-icons/ai";

const sizeIcon = 20;

const data = [
  {
    id: 1,
    title: "Home",
    icon: <AiOutlineHome size={sizeIcon} />,
  },
  {
    id: 2,
    title: "Menu",
    icon: <AiOutlineAppstore size={sizeIcon} />,
  },
  {
    id: 3,
    title: "Meja",
    icon: <AiOutlineTable size={sizeIcon} />,
  },
  {
    id: 4,
    title: "Keranjang",
    icon: <AiOutlineShoppingCart size={sizeIcon} />,
  },
  {
    id: 5,
    title: "Antrian",
    icon: <AiOutlineOrderedList size={sizeIcon} />,
  },
  {
    id: 6,
    title: "User",
    icon: <AiOutlineUser size={sizeIcon} />,
  },
];

const Sidenav = () => {
  const navigate = useNavigate();
  const handleNavigate = (title) => {
    if (title == "Home") {
      navigate("/");
    } else {
      navigate(`/${title.toLowerCase()}`);
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col items-center gap-3 z-30 bg-primary text-neutral p-4">
      {data.map((item) => {
        return (
          <Button
            key={item.id}
            className="btn-circle btn-outline btn-accent"
            onClick={() => handleNavigate(item.title)}
          >
            {item.icon}
          </Button>
        );
      })}
    </aside>
  );
};

export default Sidenav;
