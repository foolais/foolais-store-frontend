import { useState, useEffect } from "react";
import { handleSearchData } from "../../redux/slice/searchBarSlice";
import Input from "../Elements/Input/Input";
import Label from "../Elements/Input/Label";
import Button from "../Elements/Button/Button";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(handleSearchData(search));
  }, [search, dispatch]);

  return (
    <div>
      <Label
        className="input input-bordered input-sm min-w-[45vw] max-w-[45vw] gap-2"
        htmlFor="searchMenu"
      >
        <AiOutlineSearch size={12} />
        <Input
          type="text"
          name="searchMenu"
          placeholder="Cari menu..."
          onChange={(event) => setSearch(event.target.value)}
          className="grow"
          value={search}
        />
        <Button
          className="btn-circle btn-xs btn-outline"
          onClick={() => setSearch("")}
        >
          <AiOutlineClose size={12} />
        </Button>
      </Label>
    </div>
  );
};

export default SearchBar;
