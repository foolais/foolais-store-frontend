import Navbar from "./Navbar";
import Sidenav from "./Sidenav";

/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-secondary">
      <Sidenav />
      <Navbar />
      <div className="p-4 ml-16 mt-14">{children}</div>
    </div>
  );
};

export default MainLayout;
