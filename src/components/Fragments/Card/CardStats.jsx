/* eslint-disable react/prop-types */
const CardStats = ({ data }) => {
  const { text, value, icon } = data;

  return (
    <div className="w-full p-4 bg-white text-secondary shadow-md rounded-lg flex items-center gap-4 hover:scale-105 hover:bg-secondary hover:text-white duration-300 cursor-pointer">
      <div className="bg-neutral rounded-lg text-secondary w-12 h-12 p-4 flex items-center justify-center md:w-14 md:h-14">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-bold tracking-widest text-md md:text-xl">
          {value}
        </span>
        <p className="text-xs md:text-md">Total {text}</p>
      </div>
    </div>
  );
};

export default CardStats;
