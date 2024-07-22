import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineTable,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  // AiOutlineUser,
} from "react-icons/ai";

const sizeIcon = 20;

const sidenavData = [
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
  // {
  //   id: 6,
  //   title: "User",
  //   icon: <AiOutlineUser size={sizeIcon} />,
  // },
];

export default sidenavData;
