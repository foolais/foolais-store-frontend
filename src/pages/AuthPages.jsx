import { useState } from "react";
import FormLogin from "../components/Fragments/Form/FormLogin";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormRegister from "../components/Fragments/Form/FormRegister";
import Title from "../components/Elements/Text/Title";

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onHandleChangeForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <AuthLayout>
      <Title textColor="text-secondary my-4">
        {isLogin ? "Welcome Back" : "Welcome To Foolais Store"}
      </Title>
      {isLogin ? (
        <FormLogin onHandleChangeForm={onHandleChangeForm} />
      ) : (
        <FormRegister onHandleChangeForm={onHandleChangeForm} />
      )}
    </AuthLayout>
  );
};

export default AuthPages;
