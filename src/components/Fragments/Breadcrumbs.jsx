/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Breadcrumbs = ({ data }) => {
  return (
    <div className="text-sm breadcrumbs text-primary font-semibold mb-4">
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.text}>
              <Link to={item.link}>{item.text}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
