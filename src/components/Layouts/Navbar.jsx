import Avatar from "../Fragments/Avatar";

const Navbar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-20 h-14 shadow-md bg-neutral flex items-center justify-end px-4">
      <div></div>
      <Avatar width="w-8" isWithText={true} email="test@gmail.com">
        SA
      </Avatar>
    </div>
  );
};

export default Navbar;
