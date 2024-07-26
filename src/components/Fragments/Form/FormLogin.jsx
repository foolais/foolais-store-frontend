/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";
import { postLogin } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { warningDialog } from "../../../utils/utils";
import { useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const FormLogin = ({ onHandleChangeForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    dispatch(postLogin(data))
      .then((response) => {
        if (response.payload?.statusCode === 200) {
          navigate("/");
        } else {
          warningDialog("Email atau Password salah");
        }
      })
      .catch((error) => warningDialog(error));
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <FormInput
        title="Email"
        type="email"
        name="email"
        placeholder="test@mail.com"
        isInput={true}
      />
      <div className="relative">
        <FormInput
          title="Password"
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="*****"
          isInput={true}
        />
        <label className="swap swap-rotate absolute right-4 bottom-2.5">
          <input
            type="checkbox"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
          <AiOutlineEyeInvisible className="swap-off" size={25} />
          <AiOutlineEye className="swap-on" size={25} />
        </label>
      </div>
      <Button className="bg-secondary text-primary font-bold tracking-wider uppercase my-4">
        {loading ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          "Login"
        )}
      </Button>
      <span className="text-sm text-center">
        Belum punya akun?
        <span
          onClick={onHandleChangeForm}
          className="text-secondary font-bold ml-1 cursor-pointer"
        >
          Daftar
        </span>
      </span>
    </form>
  );
};

export default FormLogin;
