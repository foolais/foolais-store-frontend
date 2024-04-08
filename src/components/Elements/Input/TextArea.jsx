/* eslint-disable react/prop-types */
const TextArea = (props) => {
  const { placeholder = "", name, className, defaultValue } = props;
  return (
    <textarea
      id={name}
      placeholder={placeholder}
      name={name}
      className={className}
      defaultValue={defaultValue}
    />
  );
};

export default TextArea;
