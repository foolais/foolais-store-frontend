/* eslint-disable react/prop-types */
const Collapse = (props) => {
  const { className, title, children } = props;
  return (
    <details className={`${className} collapse`}>
      <summary className="collapse-title">{title}</summary>
      <div className="collapse-content">{children}</div>
    </details>
  );
};

export default Collapse;
