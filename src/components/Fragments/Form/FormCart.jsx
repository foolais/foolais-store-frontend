/* eslint-disable react/prop-types */
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";

const FormCart = (props) => {
  const { onSubmit, defaultValue } = props;

  const typeData = [
    { text: "Makan Ditempat", value: "dine_in" },
    { text: "Dibawa Pulang", value: "take_away" },
  ];

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <FormInput
        title="Nama"
        type="text"
        name="name"
        placeholder="Masukkan Nama..."
        isInput={true}
        defaultValue={defaultValue?.name}
        isDisabled={true}
      />
      <FormInput
        title="Jumlah"
        type="number"
        name="quantity"
        placeholder="Masukkan Jumlah..."
        isInput={true}
        defaultValue={defaultValue?.quantity}
      />
      <FormInput
        title="Tipe"
        data={typeData}
        name="type"
        isSelect={true}
        defaultValue={defaultValue?.is_take_away ? "take_away" : "dine_in"}
      />
      <FormInput
        title="Harga"
        type="number"
        name="price"
        placeholder="Masukkan Harga..."
        isInput={true}
        defaultValue={defaultValue?.price}
      />
      <Button className="bg-secondary text-white mt-4 w-full">
        Simpan Perubahan
      </Button>
    </form>
  );
};

export default FormCart;
