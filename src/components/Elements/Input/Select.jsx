/* eslint-disable react/prop-types */
const Select = (props) => {
  const { name, className, data, ...rest } = props;
  return (
    <select className={`select ${className}`} name={name} id={name} {...rest}>
      {data.map((item) => (
        <option key={item.text} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
