/* eslint-disable react/prop-types */

import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";

const FormNotes = (props) => {
  const { onSubmit, defaultValue, statusOrder } = props;
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <FormInput
        title="Catatan"
        type="text"
        name="notes"
        placeholder={
          statusOrder && defaultValue.length === 0
            ? "Tidak ada catatan"
            : "Masukkan catatan..."
        }
        isTextArea={true}
        defaultValue={defaultValue?.notes || defaultValue}
      />
      <Button
        className="bg-secondary text-white text-lg w-full mt-4"
        disabled={statusOrder}
      >
        Simpan Catatan
      </Button>
    </form>
  );
};

export default FormNotes;
