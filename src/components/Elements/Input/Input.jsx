/* eslint-disable react/prop-types */
const Input = (props) => {
  const {
    type,
    placeholder = "",
    name,
    autoComplete = "off",
    className,
    ...rest
  } = props;
  return (
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      className={className}
      {...rest}
    />
  );
};

export default Input;
