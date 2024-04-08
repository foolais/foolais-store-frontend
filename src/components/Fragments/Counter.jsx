/* eslint-disable react/prop-types */
import Button from "../Elements/Button/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = (props) => {
  const { id, value, handleCounter, className } = props;
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Button
        className="btn-circle btn-sm btn-outline"
        onClick={() => value > 1 && handleCounter(id, "minus")}
      >
        <AiOutlineMinus size={20} />
      </Button>
      <span className="font-semibold text-xl">{value}</span>
      <Button
        className="btn-circle btn-sm btn-outline"
        onClick={() => handleCounter(id, "plus")}
      >
        <AiOutlinePlus size={20} />
      </Button>
    </div>
  );
};

export default Counter;
