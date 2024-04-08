import Button from "../Elements/Button/Button";

/* eslint-disable react/prop-types */
const CardMenu = ({ children, className }) => {
  return (
    <div
      className={`card card-compact bg-neutral min-w-[45%] max-w-[45%] sm:min-w-[30%] sm:max-w-[30%] ${className}`}
    >
      {children}
    </div>
  );
};

const Figure = ({ src, alt }) => {
  return (
    <figure>
      <img src={src} alt={alt} className="w-full max-h-[180px]" />
    </figure>
  );
};

const Title = ({ title, className }) => {
  return <h3 className={`card-title ${className}`}>{title}</h3>;
};

const Price = ({ price, className }) => {
  return <p className={`card-price ${className}`}>{price}</p>;
};

CardMenu.Figure = Figure;
CardMenu.Title = Title;
CardMenu.Price = Price;

export default CardMenu;
