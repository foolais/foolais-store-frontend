/* eslint-disable react/prop-types */
import Button from "../Elements/Button/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = (props) => {
  const { id, value, handleCounter, className, disabled } = props;
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Button
        className="btn-circle btn-sm bg-neutral"
        onClick={() => value > 1 && handleCounter(id, "minus")}
        disabled={disabled}
      >
        <AiOutlineMinus size={20} />
      </Button>
      <span className="font-semibold text-xl text-neutral">{value}</span>
      <Button
        className="btn-circle btn-sm bg-neutral"
        onClick={() => handleCounter(id, "plus")}
        disabled={disabled}
      >
        <AiOutlinePlus size={20} />
      </Button>
    </div>
  );
};

export default Counter;
