/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Title from "../Elements/Text/Title";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative">
      <Link to="/" className="absolute top-2 left-10">
        <Title textColor="text-primary my-4">Foolais</Title>
      </Link>
      <Title textColor="text-secondary my-4">Welcome Back</Title>
      {children}
    </div>
  );
};

export default AuthLayout;
