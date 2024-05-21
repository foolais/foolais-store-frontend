/* eslint-disable react/prop-types */
const BadgeStatus = ({ data }) => {
  return (
    <div className="flex items-center gap-2 my-2">
      {data &&
        data.map((item) => (
          <div
            key={item.text}
            className={`badge badge-ghost gap-2 bg-${item.color} border-none text-neutral p-3 font-semibold`}
          >
            {item.text}
          </div>
        ))}
    </div>
  );
};

export default BadgeStatus;
