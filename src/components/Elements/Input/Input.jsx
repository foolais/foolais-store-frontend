/* eslint-disable react/prop-types */
const Input = (props) => {
  const {
    type,
    placeholder = "",
    name,
    autoComplete = "off",
    className,
  } = props;
  return (
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      className={className}
    />
  );
};

export default Input;
