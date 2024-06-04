/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
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
      ref={ref}
      {...rest}
    />
  );
});

Input.displayName = "Input";

export default Input;
