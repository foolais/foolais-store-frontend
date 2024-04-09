import { getCartData } from "../../redux/slice/cartSlice";
import Button from "../Elements/Button/Button";
import Avatar from "../Fragments/Avatar";
import SearchBar from "../Fragments/SearchBar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartData = useSelector(getCartData);
  return (
    <div className="fixed top-0 right-0 left-0 z-20 ml-16 h-14 shadow-md bg-neutral flex items-center justify-between px-4">
      <SearchBar />
      <div className="flex items-center justify-center gap-4">
        <div className="indicator">
          <span className="indicator-item badge badge-accent">
            {cartData.length}
          </span>
          <Button className="btn-circle btn-sm btn-outline">
            <AiOutlineShoppingCart size={20} />
          </Button>
        </div>
        <Avatar width="w-8" isWithText={true} email="test@gmail.com">
          SA
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
