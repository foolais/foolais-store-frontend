/* eslint-disable react/prop-types */
const Title = ({ children }) => {
  return (
    <h1 className="text-2xl text-neutral font-bold tracking-wider mb-4">
      {children}
    </h1>
  );
};

export default Title;
