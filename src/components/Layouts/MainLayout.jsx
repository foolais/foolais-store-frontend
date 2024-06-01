import Navbar from "./Navbar";
import Sidenav from "./Sidenav";

/* eslint-disable react/prop-types */
const MainLayout = ({ children, className }) => {
  return (
    <div className={`w-full h-auto min-h-[94vh] bg-neutral ${className || ""}`}>
      <Sidenav />
      <Navbar />
      <div className="p-4 ml-16 mt-14">{children}</div>
    </div>
  );
};

export default MainLayout;
