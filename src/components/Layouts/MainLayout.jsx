import Navbar from "./Navbar";
import Sidenav from "./Sidenav";

/* eslint-disable react/prop-types */
const MainLayout = ({ children, className }) => {
  return (
    <div
      className={`w-full h-auto min-h-screen bg-secondary ${className || ""}`}
    >
      <Sidenav />
      <Navbar />
      <div className="p-4 ml-16 mt-14">{children}</div>
    </div>
  );
};

export default MainLayout;
