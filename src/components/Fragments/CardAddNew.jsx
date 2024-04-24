/* eslint-disable react/prop-types */
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../Elements/Button/Button";
import Card from "./Card";

const CardAddNew = (props) => {
  const {
    cardClassName,
    titleClassName,
    actionClassName,
    title,
    btnOnClick = () => {},
  } = props;
  return (
    <Card className={`${cardClassName} flex items-center`}>
      <Card.Title title={title} className={titleClassName} />
      <div className={`card-actions ${actionClassName}`}>
        <Button
          className="btn btn-circle bg-neutral btn-sm"
          onClick={btnOnClick}
        >
          <AiOutlinePlus />
        </Button>
      </div>
    </Card>
  );
};

export default CardAddNew;
