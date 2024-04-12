import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";

/* eslint-disable react/prop-types */
const FormTable = (props) => {
  const { onSubmit, isEdit = false, btnText, defaultValue } = props;

  const categoryTable = [
    { text: "Makan Ditempat", value: "regular" },
    { text: "Bawa Pulang", value: "take_away" },
    { text: "Kustom", value: "custom" },
  ];

  const statusTable = [
    { text: "Kosong", value: "empty" },
    { text: "Menunggu", value: "waiting" },
    { text: "Makan", value: "eating" },
    { text: "Selesai", value: "finished" },
  ];

  return (
    <form className="flex flex-col gap-4 w-4/5" onSubmit={onSubmit}>
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
      <Button className="bg-accent my-4">{btnText}</Button>
    </form>
  );
};

export default FormTable;
