import Button from "../Elements/Button/Button";
import Avatar from "./Avatar";
import Divider from "../Elements/Divider/Divider";
import SearchBar from "./SearchBar";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toggleSidenav } from "../../redux/slice/sidenavSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: cartData } = useSelector((state) => state.cart);

  const url = window.location.href;
  const isMenuURL = url.includes("/menu");
  const sessionData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="fixed top-0 right-0 left-0 md:ml-16 h-14 shadow-md bg-neutral flex items-center px-4 z-[2] justify-between">
      <div className="flex items-center justify-center gap-2">
        <div
          className="md:hidden cursor-pointer"
          onClick={() => dispatch(toggleSidenav())}
        >
          <AiOutlineMenu size={20} />
        </div>
        {isMenuURL && <SearchBar />}
      </div>
      <>
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <div className="indicator">
            <span className="indicator-item badge">{cartData.length}</span>

            <Button
              onClick={() => navigate("/keranjang")}
              className="btn-circle btn-sm btn-outline"
            >
              <AiOutlineShoppingCart size={20} />
            </Button>
          </div>
          <Divider className="divider-horizontal mr-0.5 ml-0.5" />

          {sessionData ? (
            <Avatar
              width="w-8"
              isWithText={true}
              username={sessionData ? sessionData?.username : ""}
            ></Avatar>
          ) : (
            <Link to={"/login"}>
              <Button className="btn-circle btn-sm bg-primary" />
            </Link>
          )}
        </div>
      </>
    </div>
  );
};

export default Navbar;
