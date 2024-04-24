import { Link } from "react-router-dom";

const ErrorPages = () => {
  return (
    <div className="w-screen h-screen bg-primary grid justify-items-center content-center text-neutral">
      <h1 className="font-extralight text-9xl tracking-widest font mb-5">
        404
      </h1>
      <p className="text-xl mb-2">Oops...Page not found.</p>
      <Link to={"/"}>
        <p className="text-md cursor-pointer text-primary hover:text-neutral">
          Homepage
        </p>
      </Link>
    </div>
  );
};

export default ErrorPages;
