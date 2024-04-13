/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useRef } from "react";
import Input from "./Input";
import Dropdown from "./Dropdown";
import { AiOutlineDown } from "react-icons/ai";

const AutoComplete = (props) => {
  const { name, placeholder, widthClassName, data, onSelect } = props;
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const dropownData = useMemo(() => data, [data]);

  const filteredData = useMemo(() => {
    if (search === "") return dropownData;
    return dropownData.filter((item) =>
      item.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [dropownData, search]);

  const handleSelect = (selectedValue) => {
    if (selectedValue) {
      setSearch(selectedValue?.text);
      setIsOpen(false);
      setSelectedData(selectedValue);
      onSelect(selectedValue);
    }
  };
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (!selectedData) {
        setSearch("");
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedData]);

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`input input-bordered flex items-center gap-4 ${
          widthClassName || ""
        }`}
      >
        <Input
          type="text"
          name={name}
          value={search}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-10/12"
        />
        <div
          className={`transition duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <AiOutlineDown size={15} />
        </div>
      </label>
      <Dropdown className={isOpen && "dropdown-open"} ref={dropdownRef}>
        <Dropdown.Container className={widthClassName || ""}>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Dropdown.Item
                key={item?.value}
                onClick={() => handleSelect(item)}
                text={item?.text}
              />
            ))
          ) : (
            <Dropdown.Item text={`Tidak ada Data untuk "${search}"`} />
          )}
        </Dropdown.Container>
      </Dropdown>
    </div>
  );
};

export default AutoComplete;
