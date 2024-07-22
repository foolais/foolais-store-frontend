/* eslint-disable react/prop-types */
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../Elements/Button/Button";
import Card from "./Card";

const CardAddNew = (props) => {
  const {
    cardClassName,
    titleClassName,
    actionClassName,
    title,
    btnOnClick = () => {},
    onEdit = false,
  } = props;
  return (
    <Card
      className={`${cardClassName} flex items-center justify-center py-4 px-2 ${
        onEdit ? "opacity-0" : "opacity-100"
      } ease-in-out duration-300`}
    >
      <Card.Title title={title} className={titleClassName} />
      <div className={`card-actions ${actionClassName} ,t=`}>
        <Button
          className="btn btn-circle btn-sm xl:btn-md bg-secondary text-white"
          onClick={btnOnClick}
        >
          <AiOutlinePlus size={20} />
        </Button>
      </div>
    </Card>
  );
};

export default CardAddNew;
