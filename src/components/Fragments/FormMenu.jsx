import Button from "../Elements/Button/Button";
import FormInput from "../Fragments/Form/FormInput";

/* eslint-disable react/prop-types */
const FormMenu = (props) => {
  const { onSubmit, isEdit = false, btnText, defaultValue } = props;

  const statusData = [
    { text: "Tersedia", value: true },
    { text: "Habis", value: false },
  ];

  const categoryData = [
    { text: "Makanan", value: "food" },
    { text: "Minuman", value: "drink" },
    { text: "Tambahan", value: "extra" },
  ];

  return (
    <form className="flex flex-col gap-4 " onSubmit={onSubmit}>
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
        <FormInput
          title="Status"
          data={statusData}
          name="is_available"
          isSelect={true}
          defaultValue={defaultValue?.is_available}
        />
      )}
      <Button className="bg-secondary text-white mt-4 w-full">{btnText}</Button>
    </form>
  );
};

export default FormMenu;
