import Avatar from "../Fragments/Avatar";
import SearchBar from "../Fragments/SearchBar";

const Navbar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-20 ml-16 h-14 shadow-md bg-neutral flex items-center justify-between px-4">
      <SearchBar />
      <Avatar width="w-8" isWithText={true} email="test@gmail.com">
        SA
      </Avatar>
    </div>
  );
};

export default Navbar;
