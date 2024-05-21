import { AiOutlineClose } from "react-icons/ai";
import Button from "../../Elements/Button/Button";

/* eslint-disable react/prop-types */
const FooterLayout = ({ title, children, isWithCloseBtn, onClickCloseBtn }) => {
  return (
    <div className="fixed bottom-0 right-0 left-0 h-[7.5rem] bg-primary ml-16 flex shadow-md">
      {/* Title Name */}
      <div className="absolute -top-6 left-0 bg-secondary py-2 px-4 rounded-r-md text-primary font-semibold gap-4 flex items-center">
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
      <div className="w-full flex justify-evenly md:justify-between md:mx-4 gap-4">
        {children}
      </div>
    </div>
  );
};

export default FooterLayout;
