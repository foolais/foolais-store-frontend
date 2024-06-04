/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";
import Button from "../../Elements/Button/Button";

const FooterLayouts = ({ children }) => {
  return (
    <div className="ml-16 my-4 fixed bottom-0 p-4 left-4 right-4 rounded-lg bg-white border-[1px] border-secondary">
      {children}
    </div>
  );
};

const Title = ({ title, isWithCloseBtn, onClickCloseBtn }) => {
  return (
    <div className="bg-secondary rounded-lg py-2 px-4 font-semibold w-max flex items-center gap-2 text-xl">
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
      className={`${className} bg-secondary text-lg text-white w-full font-semibold mt-4`}
      {...rest}
    >
      {children}
    </Button>
  );
};

FooterLayouts.Title = Title;
FooterLayouts.BtnAction = BtnAction;

export default FooterLayouts;
