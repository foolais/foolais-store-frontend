/* eslint-disable react/prop-types */
const Title = ({ children, textColor }) => {
  return (
    <h1
      className={`text-2xl font-bold tracking-wider ${
        textColor ? textColor : "text-neutral "
      }`}
    >
      {children}
    </h1>
  );
};

export default Title;
