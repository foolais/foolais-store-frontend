/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";
import Button from "../../Elements/Button/Button";
import { useSelector } from "react-redux";

const FooterLayout = ({ children }) => {
  const { isMini } = useSelector((state) => state.sidenav);

  return (
    <div
      className={`md:ml-16 my-2 md:my-4 fixed bottom-0 p-4 left-4 right-4 rounded-lg bg-white border-[1px] border-secondary lg:relative lg:right-auto lg:left-auto lg:max-h-[50vh] lg:ml-0 ${
        isMini ? "z-10" : "z-0"
      }`}
    >
      {children}
    </div>
  );
};

const Title = ({ title, isWithCloseBtn, onClickCloseBtn }) => {
  return (
    <div className="bg-secondary rounded-lg py-2 px-4 font-semibold w-max flex items-center gap-2 text-sm md:text-xl">
      <p>{title}</p>
      {isWithCloseBtn && (
        <Button
          className="btn-circle btn-xs btn-outline"
          onClick={onClickCloseBtn}
        >
          <AiOutlineClose size={12} />
        </Button>
      )}
    </div>
  );
};

const BtnAction = ({ children, className, ...rest }) => {
  return (
    <Button
      className={`${className} bg-secondary text-sm md:text-lg text-white w-full font-semibold mt-4 btn-md`}
      {...rest}
    >
      {children}
    </Button>
  );
};

FooterLayout.Title = Title;
FooterLayout.BtnAction = BtnAction;

export default FooterLayout;
