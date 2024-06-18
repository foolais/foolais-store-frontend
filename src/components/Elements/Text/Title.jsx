/* eslint-disable react/prop-types */
const Title = ({ children, textColor }) => {
  return (
    <h1
      className={`text-xl md:text-2xl font-bold tracking-wider ${
        textColor ? textColor : "text-primary"
      }`}
    >
      {children}
    </h1>
  );
};

export default Title;
