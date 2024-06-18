import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";

/* eslint-disable react/prop-types */
const FormTable = (props) => {
  const { onSubmit, isEdit = false, btnText, defaultValue } = props;

  const categoryTable = [
    { text: "Regular", value: "regular" },
    { text: "Kustom", value: "custom" },
  ];

  const typeTable = [
    { text: "Makan Ditempat", value: "dine_in" },
    { text: "Dibawa Pulang", value: "take_away" },
  ];

  const statusTable = [
    { text: "Kosong", value: "empty" },
    { text: "Menunggu", value: "waiting" },
    { text: "Makan", value: "eating" },
  ];

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <FormInput
        title="Nama"
        type="text"
        name="name"
        placeholder="Masukkan Nama"
        isInput={true}
        defaultValue={defaultValue?.name}
      />
      <FormInput
        title="Kategori"
        data={categoryTable}
        name="category"
        placeholder="Masukkan Kategori"
        isSelect={true}
        defaultValue={defaultValue?.category}
      />
      <FormInput
        title="Tipe"
        data={typeTable}
        name="type"
        placeholder="Masukkan Tipe"
        isSelect={true}
        defaultValue={defaultValue?.type}
      />
      {isEdit && (
        <FormInput
          title="Status"
          data={statusTable}
          name="status"
          placeholder="Masukkan Status"
          isSelect={true}
          defaultValue={defaultValue?.status}
        />
      )}
      <Button className="bg-secondary text-white mt-4 w-full">{btnText}</Button>
    </form>
  );
};

export default FormTable;
