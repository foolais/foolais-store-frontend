import Navbar from "../Fragments/Navbar";
import Sidenav from "../Fragments/Sidenav";

/* eslint-disable react/prop-types */
const MainLayout = ({ children, className }) => {
  return (
    <div className={`w-full h-auto min-h-[94vh] bg-neutral ${className || ""}`}>
      <Sidenav />
      <Navbar />
      <div className="p-4 md:ml-16 mt-14">{children}</div>
    </div>
  );
};

export default MainLayout;
