/* eslint-disable react/prop-types */
const Button = (props) => {
  const {
    children,
    className,
    type = "submit",
    onClick = () => {},
    ...rest
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn disabled:bg-gray-300 disabled:text-gray-400 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
