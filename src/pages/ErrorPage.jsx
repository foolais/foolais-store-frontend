import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen bg-accent grid justify-items-center content-center text-secondary">
      <h1 className="font-extralight text-9xl tracking-widest font mb-5">
        404
      </h1>
      <p className="text-xl mb-2">Oops...Page not found.</p>
      <Link to={"/"}>
        <p className="text-md cursor-pointer text-ternary hover:text-secondary">
          Homepage
        </p>
      </Link>
    </div>
  );
};

export default ErrorPage;
