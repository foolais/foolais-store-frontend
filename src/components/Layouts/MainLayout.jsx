import Sidenav from "../Fragments/Sidenav";

/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-secondary">
      <Sidenav />
      <div className="p-4 ml-16">{children}</div>
    </div>
  );
};

export default MainLayout;
