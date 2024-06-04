/* eslint-disable react/prop-types */

import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";

const FormNotes = (props) => {
  const { onSubmit, defaultValue } = props;
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <FormInput
        title="Catatan"
        type="text"
        name="notes"
        placeholder="Masukkan Catatan..."
        isTextArea={true}
        defaultValue={defaultValue?.notes || defaultValue}
      />
      <Button className="bg-secondary text-white text-lg w-full mt-4">
        Simpan Catatan
      </Button>
    </form>
  );
};

export default FormNotes;
