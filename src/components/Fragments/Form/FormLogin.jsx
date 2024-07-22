import { useDispatch } from "react-redux";
import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";
import { postLogin } from "../../../redux/slice/loginSlice";
import { useNavigate } from "react-router-dom";
import { warningDialog } from "../../../utils/utils";
import { useSelector } from "react-redux";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.login);

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
      <FormInput
        title="Password"
        type="password"
        name="password"
        placeholder="*****"
        isInput={true}
      />
      <Button className="bg-secondary text-primary font-bold tracking-wider uppercase my-4">
        {loading ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          "Log in"
        )}
      </Button>
    </form>
  );
};

export default FormLogin;
