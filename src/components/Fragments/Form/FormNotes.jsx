/* eslint-disable react/prop-types */

import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";

const FormNotes = (props) => {
  const { onSubmit, defaultValue, isDisabled } = props;
  return (
    <form className="flex flex-col gap-2 md:gap-4" onSubmit={onSubmit}>
      <FormInput
        title="Catatan"
        type="text"
        name="notes"
        placeholder={
          isDisabled && defaultValue.length === 0
            ? "Tidak ada catatan"
            : "Masukkan catatan..."
        }
        isTextArea={true}
        defaultValue={defaultValue?.notes || defaultValue}
      />
      <Button
        className="bg-secondary text-white text-md md:text-lg w-full mt-4"
        disabled={isDisabled}
      >
        Simpan Catatan
      </Button>
    </form>
  );
};

export default FormNotes;
