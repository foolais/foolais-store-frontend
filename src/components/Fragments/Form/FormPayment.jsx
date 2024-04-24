import { useSelector } from "react-redux";
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";
import { getCartTotalPrice } from "../../../redux/slice/cartSlice";

/* eslint-disable react/prop-types */
const FormPayment = (props) => {
  const { onSubmit } = props;

  const totalPrice = useSelector(getCartTotalPrice);

  console.log({ totalPrice });

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        title="Total Bayar"
        type="number"
        name="number"
        isInput={true}
        disabled={true}
        defaultValue={totalPrice}
      />
      <Button className="bg-primary text-neutral my-4">Bayar</Button>
    </form>
  );
};

export default FormPayment;
