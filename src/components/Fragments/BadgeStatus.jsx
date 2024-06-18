/* eslint-disable react/prop-types */
const BadgeStatus = (props) => {
  const { data, isClickable = false, onBadgeChange = () => {} } = props;
  return (
    <div className="flex flex-wrap items-center gap-2 my-2 max-w-[90vw]">
      {data &&
        data.map((item) => (
          <div
            key={item.text}
            onClick={() => isClickable && onBadgeChange(item.value)}
            className={`badge badge-ghost gap-2 bg-${
              item.color
            } border-none text-neutral text-xs md:text-base py-4 px-3 md:px-5 font-semibold ${
              isClickable && "cursor-pointer hover:opacity-70"
            }`}
          >
            {item.text}
          </div>
        ))}
    </div>
  );
};

export default BadgeStatus;
