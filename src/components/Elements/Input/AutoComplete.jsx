/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useRef } from "react";
import Input from "./Input";
import Dropdown from "./Dropdown";
import { AiOutlineDown } from "react-icons/ai";

const AutoComplete = (props) => {
  const {
    name,
    placeholder,
    widthClassName,
    data,
    onSelect = () => {},
    value = null,
  } = props;

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedData, setSelectedData] = useState(value);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
      onSelect(selectedValue);
      setSelectedData(selectedValue);
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        if (search !== selectedData?.text) {
          setSearch("");
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedData, search]);

  useEffect(() => {
    setSelectedData(value);
    setSearch(value?.text || "");
  }, [value]);

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`input input-bordered flex items-center gap-4 max-h-10 ${
          widthClassName || ""
        }`}
      >
        <Input
          type="text"
          name={name}
          value={search}
          onChange={handleChange}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-10/12"
          ref={inputRef}
        />
        <div
          className={`transition duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <AiOutlineDown size={15} />
        </div>
      </label>
      <Dropdown
        className={`${
          isOpen ? "dropdown-open opacity-100 -mt-1" : "opacity-0 scale-0"
        } transition-all ease-in-out duration-300`}
        ref={dropdownRef}
      >
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
