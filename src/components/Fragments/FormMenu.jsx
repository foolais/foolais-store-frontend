import Button from "../Elements/Button/Button";
import Input from "../Elements/Input/Input";
import Select from "../Elements/Input/Select";
import TextArea from "../Elements/Input/TextArea";

/* eslint-disable react/prop-types */
const FormMenu = (props) => {
  const { onSubmit, isEdit = false, btnText, defaultValue } = props;

  const typeData = [
    { text: "Makan Ditempat", value: true },
    { text: "Bawa Pulang", value: false },
  ];

  const statusData = [
    { text: "Tersedia", value: true },
    { text: "Habis", value: false },
  ];

  const categoryData = [
    { text: "Makanan", value: "food" },
    { text: "Minuman", value: "drink" },
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
        title="Harga"
        type="number"
        name="price"
        placeholder="Masukkan Harga"
        isInput={true}
        defaultValue={defaultValue?.price}
      />
      <FormInput
        title="Kategori"
        data={categoryData}
        name="category"
        isSelect={true}
        defaultValue={defaultValue?.category}
      />
      {isEdit && (
        <>
          <FormInput
            title="Tipe Makan"
            data={typeData}
            name="is_take_away"
            isSelect={true}
            defaultValue={defaultValue?.is_take_away}
          />
          <FormInput
            title="Status"
            data={statusData}
            name="is_available"
            isSelect={true}
            defaultValue={defaultValue?.is_available}
          />
          <FormInput
            title="Catatan"
            placeholder="Masukkan Catatan"
            name="notes"
            isTextArea={true}
            defaultValue={defaultValue?.notes || "-"}
          />
        </>
      )}
      <Button className="bg-accent my-4">{btnText}</Button>
    </form>
  );
};

const FormInput = (props) => {
  const {
    title,
    name,
    required,
    isInput = false,
    isTextArea = false,
    isSelect = false,
    defaultValue = null,
  } = props;

  const type = props?.type;
  const data = props?.data;
  const placeholder = props?.placeholder;

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-semibold">{title}</span>
      </div>
      {isTextArea && (
        <TextArea
          name={name}
          className="textarea textarea-bordered"
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
        />
      )}
      {isInput && (
        <Input
          type={type}
          name={name}
          className="input input-bordered w-full "
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
        />
      )}
      {isSelect && (
        <Select
          name={name}
          className=" select-bordered "
          data={data}
          required={required}
          defaultValue={defaultValue}
        />
      )}
    </label>
  );
};

export default FormMenu;
