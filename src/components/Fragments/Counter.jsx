/* eslint-disable react/prop-types */
import Button from "../Elements/Button/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = (props) => {
  const { id, value = 1, handleCounter, className, disabled } = props;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        className="btn-circle btn-xs md:btn-sm bg-secondary text-white"
        onClick={() => value > 1 && handleCounter(id, "minus")}
        disabled={disabled}
      >
        <AiOutlineMinus size={20} />
      </Button>
      <span className="font-semibold text-md md:text-xl text-primary">
        {value}
      </span>
      <Button
        className="btn-circle btn-xs md:btn-sm bg-secondary text-white"
        onClick={() => handleCounter(id, "plus")}
        disabled={disabled}
      >
        <AiOutlinePlus size={20} />
      </Button>
    </div>
  );
};

export default Counter;
