/* eslint-disable react/prop-types */
const Avatar = (props) => {
  const { width, isWithText, username } = props;
  return (
    <div className="avatar placeholder flex items-center gap-2">
      {isWithText && (
        <span className="text-primary items-center hidden md:block">
          {username || "FX"}
        </span>
      )}
      <div className={`bg-primary text-neutral rounded-full ${width} `}></div>
    </div>
  );
};

export default Avatar;
