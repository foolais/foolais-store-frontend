import { getCartData } from "../../redux/slice/cartSlice";
import Button from "../Elements/Button/Button";
import Avatar from "../Fragments/Avatar";
import Divider from "../Elements/Divider/Divider";
import SearchBar from "../Fragments/SearchBar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const cartData = useSelector(getCartData);
  const url = window.location.href;
  const isMenuURL = url.includes("/menu");

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-20 ml-16 h-14 shadow-md bg-neutral flex items-center px-4 ${
        isMenuURL ? "justify-between" : "justify-end"
      }`}
    >
      {isMenuURL && <SearchBar />}
      <div className="flex items-center justify-center gap-4">
        <div className="indicator">
          <span className="indicator-item badge badge-accent">
            {cartData.length}
          </span>

          <Button
            onClick={() => navigate("/keranjang")}
            className="btn-circle btn-sm btn-outline"
          >
            <AiOutlineShoppingCart size={20} />
          </Button>
        </div>
        <Divider className="divider-horizontal mr-0.5 ml-0.5" />
        <Link to={"/login"}>
          <Avatar width="w-8" isWithText={true} username="testa">
            SA
          </Avatar>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
