import { useSelector } from "react-redux";
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";

/* eslint-disable react/prop-types */
const FormPayment = (props) => {
  const { onSubmit } = props;

  const { totalPrice } = useSelector((state) => state.cart);

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
