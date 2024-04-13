/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const Dropdown = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={`dropdown absolute top-8 ${className || ""}`}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

Dropdown.displayName = "Dropdown";

const ButtonItem = (props) => {
  const { text } = props;
  return (
    <button tabIndex={0} role="button" className="btn">
      {text}
    </button>
  );
};

const Container = ({ children, className }) => {
  return (
    <ul
      className={`dropdown-content z-30 menu p-2 shadow bg-primary text-neutral rounded-b-box mt-3 ${className}`}
    >
      {children}
    </ul>
  );
};

const Item = (props) => {
  const { text, onClick } = props;
  return (
    <li onClick={onClick}>
      <a>{text}</a>
    </li>
  );
};

Dropdown.ButtonItem = ButtonItem;
Dropdown.Container = Container;
Dropdown.Item = Item;

export default Dropdown;
