/* eslint-disable react/prop-types */
const Label = (props) => {
  const { htmlFor, children, className, ...rest } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`input flex items-center ${className}`}
      {...rest}
    >
      {children}
    </label>
  );
};

export default Label;
