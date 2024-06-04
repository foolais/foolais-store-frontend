import Input from "../../Elements/Input/Input";
import Select from "../../Elements/Input/Select";
import TextArea from "../../Elements/Input/TextArea";

/* eslint-disable react/prop-types */
const FormInput = (props) => {
  const {
    title,
    name,
    required,
    isInput = false,
    isTextArea = false,
    isSelect = false,
    defaultValue = null,
    isDisabled = false,
  } = props;

  const type = props?.type;
  const data = props?.data;
  const placeholder = props?.placeholder;

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-semibold">{title}</span>
      </div>
      {isInput && (
        <Input
          type={type}
          name={name}
          className="input input-bordered w-full "
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          disabled={isDisabled}
        />
      )}
      {isTextArea && (
        <TextArea
          name={name}
          className="textarea textarea-bordered min-h-[100px]"
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

export default FormInput;
