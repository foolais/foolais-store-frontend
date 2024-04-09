/* eslint-disable react/prop-types */
const Title = ({ children }) => {
  return (
    <h1 className="text-2xl text-neutral font-bold tracking-wider">
      {children}
    </h1>
  );
};

export default Title;
