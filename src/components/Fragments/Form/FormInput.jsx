import { AiOutlineInfoCircle } from "react-icons/ai";
import AutoComplete from "../../Elements/Input/AutoComplete";
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
    isAutoComplete = false,
    defaultValue = null,
    isDisabled = false,
    isWithInfo = false,
    infoText = "",
    ...rest
  } = props;

  const type = props?.type;
  const data = props?.data;
  const placeholder = props?.placeholder;

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-semibold flex items-center">
          {title}
          {isWithInfo && (
            <div
              className="tooltip tooltip-right ml-1 cursor-pointer w-4 h-4"
              data-tip={infoText}
            >
              <AiOutlineInfoCircle />
            </div>
          )}
        </span>
      </div>
      {isInput && (
        <Input
          type={type}
          name={name}
          className="input input-bordered w-full disabled:text-gray-900"
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          disabled={isDisabled}
          {...rest}
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
          className="select-bordered "
          data={data}
          required={required}
          defaultValue={defaultValue}
          disabled={isDisabled}
        />
      )}
      {isAutoComplete && (
        <AutoComplete
          name={name}
          widthClassName="w-full"
          placeholder={placeholder}
          data={props?.data}
          value={defaultValue}
          onSelect={props?.onSelect}
        />
      )}
    </label>
  );
};

export default FormInput;
