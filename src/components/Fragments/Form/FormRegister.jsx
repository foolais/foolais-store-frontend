/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { successDialog, warningDialog } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { postRegister } from "../../../redux/slice/authSlice";

const InputPassword = ({ name, title }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <FormInput
        title={title}
        type={isPasswordVisible ? "text" : "password"}
        name={name}
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
  );
};

const FormRegister = ({ onHandleChangeForm }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const validateRegister = (data) => {
    const { username, email, password, confirmPassword } = data;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    console.log({ isValidEmail });

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      throw new Error("Semua field harus diisi");
    } else if (username.length > 15) {
      throw new Error("Username tidak boleh lebih dari 15 karakter");
    } else if (!isValidEmail) {
      throw new Error("Email tidak valid");
    } else if (password !== confirmPassword) {
      throw new Error("Password tidak sama");
    }

    return true;
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      validateRegister(data);
      delete data.confirmPassword;
      dispatch(postRegister(data))
        .then((response) => {
          if (response?.payload?.statusCode === 201) {
            successDialog("Registrasi Berhasil");
            onHandleChangeForm();
          } else {
            warningDialog(response?.payload);
          }
        })
        .catch((error) => warningDialog(error));
    } catch (error) {
      warningDialog(error?.message);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-4 w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4"
      autoComplete="off"
    >
      <FormInput
        title="Email"
        type="email"
        name="email"
        placeholder="test@mail.com"
        isInput={true}
      />
      <FormInput
        title="Username"
        type="text"
        name="username"
        placeholder="foolaisx"
        isInput={true}
      />
      <InputPassword title="Password" name="password" />
      <InputPassword title="Konfirmasi Password" name="confirmPassword" />
      <FormInput
        title="Role"
        name="role"
        data={[
          { text: "Regular", value: "regular" },
          { text: "Admin", value: "admin" },
        ]}
        isSelect={true}
        defaultValue="regular"
        isWithInfo={true}
        infoText="Reguler hanya mendapat izin terbatas, Admin dapat mengakses semua fitur"
      />
      <Button className="bg-secondary text-primary font-bold tracking-wider uppercase my-4">
        {loading ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          "Daftar"
        )}
      </Button>
      <span className="text-sm text-center">
        Sudah punya akun?
        <span
          onClick={onHandleChangeForm}
          className="text-secondary font-bold ml-1 cursor-pointer"
        >
          Login
        </span>
      </span>
    </form>
  );
};

export default FormRegister;
