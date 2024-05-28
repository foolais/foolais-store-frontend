import Button from "../Elements/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineTable,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../redux/slice/loginSlice";

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
    title: "Pesanan",
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
  const location = useLocation();
  const dispatch = useDispatch();

  const isActive = (title) => {
    return location.pathname.includes(`/${title.toLowerCase()}`);
  };

  const handleNavigate = (title) => {
    if (title == "Home") {
      navigate("/");
    } else {
      navigate(`/${title.toLowerCase()}`);
    }
  };

  const onLogoutBtn = () => {
    dispatch(handleLogout());
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col items-center gap-3 bg-neutral shadow-md text-neutral p-4 z-10">
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="tooltip tooltip-right"
            data-tip={item.title}
          >
            <Button
              className={`btn-circle border-2 border-primary ${
                isActive(item.title)
                  ? "btn-outline "
                  : "bg-primary text-neutral"
              }`}
              onClick={() => handleNavigate(item.title)}
            >
              {item.icon}
            </Button>
          </div>
        );
      })}
      <div
        className="tooltip tooltip-right absolute bottom-5"
        data-tip="Logout"
      >
        <Button
          onClick={() => onLogoutBtn()}
          className="btn-outline text-primary border-2 btn-circle hover:bg-primary hover:text-neutral"
        >
          <AiOutlineLogout />
        </Button>
      </div>
    </aside>
  );
};

export default Sidenav;
