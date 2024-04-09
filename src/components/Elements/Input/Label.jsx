/* eslint-disable react/prop-types */
const Label = (props) => {
  const { htmlFor, children, className } = props;
  return (
    <label htmlFor={htmlFor} className={`input flex items-center ${className}`}>
      {children}
    </label>
  );
};

export default Label;
