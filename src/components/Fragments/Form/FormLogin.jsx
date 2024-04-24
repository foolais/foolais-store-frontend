import Button from "../../Elements/Button/Button";
import FormInput from "./FormInput";

const FormLogin = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log({ data });
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-4/5">
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
      <Button className="bg-primary text-neutral my-4">Login</Button>
    </form>
  );
};

export default FormLogin;
