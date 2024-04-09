/* eslint-disable react/prop-types */
const Avatar = (props) => {
  const { width, children, isWithText, email } = props;
  return (
    <div className="avatar placeholder flex items-center gap-2">
      {isWithText && (
        <span className="text-secondary items-center">{email}</span>
      )}
      <div className={`bg-accent text-secondary rounded-full ${width} `}>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Avatar;
