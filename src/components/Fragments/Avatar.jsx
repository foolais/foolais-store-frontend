/* eslint-disable react/prop-types */
const Avatar = (props) => {
  const { width, children, isWithText, username } = props;
  return (
    <div className="avatar placeholder flex items-center gap-2">
      {isWithText && (
        <span className="text-secondary items-center">{username}</span>
      )}
      <div className={`bg-accent text-secondary rounded-full ${width} `}>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Avatar;
