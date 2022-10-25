import styles from "./Login.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import LoginLayout from "components/Layout/LoginLayout/LoginLayout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorToast } from "utils/toast";
import { User } from "types/user";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  // submit handler
  const onSubmit = handleSubmit(async (data) => {
    // get users from api
    const users = (await (
      await axios.get(`${process.env.REACT_APP_HOST}/users/`)
    ).data) as User[];

    // check if username and password is correct
    const user =
      users.length > 0
        ? users.find(
            (user) =>
              user.username === data.username && user.password === data.password
          )
        : null;

    // if user exists
    if (!user) {
      errorToast("Invalid username or password");
      return;
    }

    // if user exists, save user to local storage
    if (user) {
      localStorage.setItem("ova_user", JSON.stringify(user));
      window.location.href = "/";
      navigate("/", { replace: true });
    }
  });

  return (
    <LoginLayout>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.heading}>Login</h2>

        {/* username */}
        <Label htmlFor="username" className={styles.label}>
          Username
        </Label>
        <Input
          id="username"
          className={styles.input}
          {...register("username", { required: true })}
        />

        <Label htmlFor="password" className={styles.label}>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          className={styles.input}
          {...register("password", { required: true })}
        />

        <Button className={styles.button} fluid size="large">
          Login
        </Button>
      </form>
    </LoginLayout>
  );
};

export default Login;
