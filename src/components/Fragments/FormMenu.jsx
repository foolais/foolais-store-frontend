import Button from "../Elements/Button/Button";
import Input from "../Elements/Input/Input";
import Select from "../Elements/Input/Select";
import TextArea from "../Elements/Input/TextArea";

/* eslint-disable react/prop-types */
const FormMenu = (props) => {
  const { onSubmit } = props;

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
      />
      <FormInput
        title="Harga"
        type="number"
        name="price"
        placeholder="Masukkan Harga"
        isInput={true}
      />
      <FormInput
        title="Kategori"
        data={categoryData}
        name="category"
        isSelect={true}
      />
      <Button className="bg-accent my-4">Tambah Menu</Button>
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
        />
      )}
      {isInput && (
        <Input
          type={type}
          name={name}
          className="input input-bordered w-full "
          placeholder={placeholder}
          required={required}
        />
      )}
      {isSelect && (
        <Select
          name={name}
          className=" select-bordered "
          data={data}
          required={required}
        />
      )}
    </label>
  );
};

export default FormMenu;
