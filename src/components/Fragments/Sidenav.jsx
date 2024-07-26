import Button from "../Elements/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLogout, AiOutlineLeft, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../redux/slice/loginSlice";
import { toggleSidenav } from "../../redux/slice/sidenavSlice";
import { useEffect } from "react";
import sidenavData from "../../utils/sidenavData";
import { showConfirmationDialog } from "../../utils/utils";

const data = sidenavData;

const Sidenav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isMini } = useSelector((state) => state.sidenav);

  const isActive = (title) => {
    return location.pathname.includes(`/${title.toLowerCase()}`);
  };

  const handleNavigate = (title) => {
    if (!isMini) dispatch(toggleSidenav());
    if (title == "Home") {
      navigate("/");
    } else {
      navigate(`/${title.toLowerCase()}`);
    }
  };

  const onLogoutBtn = () => {
    const text = "Apakah anda yakin ingin keluar ?";
    const successText = "Berhasil keluar";
    showConfirmationDialog(text, successText, (isConfirmed) => {
      if (isConfirmed) {
        dispatch(handleLogout());
        navigate("/login");
      }
    });
  };

  const isLogin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        document.getElementById("sidenav") &&
        !document.getElementById("sidenav").contains(event.target) &&
        window.innerWidth <= 1024 &&
        !isMini
      ) {
        dispatch(toggleSidenav());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMini]);

  return (
    <aside
      id="sidenav"
      className={`fixed top-0 left-0 h-screen w-16 m-0 flex-col items-center gap-3 bg-neutral shadow-md text-neutral md:z-10 ${
        isMini
          ? "translate-x-[-300%] md:translate-x-0"
          : "flex w-[65vw] md:w-[20vw] translate-x-0 z-[100]"
      } transform duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-start gap-6 w-full ml-6 h-14">
        <div
          className="text-primary cursor-pointer"
          onClick={() => dispatch(toggleSidenav())}
        >
          {isMini ? <AiOutlineMenu size={20} /> : <AiOutlineLeft size={20} />}
        </div>
        <p
          className={`text-xl text-primary font-bold tracking-widest ${
            isMini && "hidden"
          }`}
        >
          Foolais
        </p>
      </div>
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className={`${
              isMini
                ? "tooltip tooltip-right flex flex-col items-center justify-center w-full my-4"
                : "flex items-center justify-start w-full gap-4 hover:bg-primary/50 px-2 py-1 cursor-pointer"
            }`}
            data-tip={item.title}
            onClick={() => !isMini && handleNavigate(item.title)}
          >
            <Button
              className={`btn-circle btn-sm md:btn-md border-2 border-primary ${
                isActive(item.title)
                  ? "btn-outline "
                  : "bg-primary text-neutral"
              }`}
              onClick={() => isMini && handleNavigate(item.title)}
            >
              {item.icon}
            </Button>
            <p className={`text-primary font-semibold ${isMini && "hidden"}`}>
              {item.title}
            </p>
          </div>
        );
      })}
      <div
        className={`absolute bottom-5 ${
          isMini
            ? "tooltip tooltip-right flex items-center justify-center w-full mb-2"
            : "flex items-center justify-start w-full gap-4 hover:bg-primary/50 px-2 py-1 cursor-pointer"
        }`}
        data-tip="Logout"
        onClick={() => !isMini && onLogoutBtn()}
      >
        <Button
          onClick={() => isMini && onLogoutBtn()}
          className={`btn-outline text-primary border-2 btn-circle btn-sm md:btn-md hover:bg-primary hover:text-neutral ${
            !isLogin && "hidden"
          }`}
        >
          <AiOutlineLogout />
        </Button>
        <p
          className={`text-primary font-semibold ${
            (isMini || !isLogin) && "hidden"
          }`}
        >
          Log Out
        </p>
      </div>
    </aside>
  );
};

export default Sidenav;
