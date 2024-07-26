import { useNavigate } from "react-router-dom";
import Navbar from "../Fragments/Navbar";
import Sidenav from "../Fragments/Sidenav";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../redux/slice/authSlice";
import { warningWithCallback } from "../../utils/utils";
import useTokenAuthValid from "../../hooks/useTokenAuthValid";

/* eslint-disable react/prop-types */
const MainLayout = ({ children, className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthValid, isValidUser } = useTokenAuthValid();

  if (!isAuthValid && isValidUser) {
    warningWithCallback("Token telah expired", () => {
      dispatch(handleLogout());
      navigate("/auth");
    });
  }

  return (
    <div className={`w-full h-auto min-h-[94vh] bg-neutral ${className || ""}`}>
      <Sidenav />
      <Navbar />
      <div className="p-4 md:ml-16 mt-14">{children}</div>
    </div>
  );
};

export default MainLayout;
