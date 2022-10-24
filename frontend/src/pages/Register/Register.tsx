import styles from "./Register.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useLocation, Link } from "react-router-dom";
import LoginLayout from "components/Layout/LoginLayout/LoginLayout";
import { useForm } from "react-hook-form";
import { errorToast } from "utils/toast";
import axios from "axios";
import { User } from "types/user";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  confirm_password: string;
}

const Login = () => {
  const { pathname } = useLocation();
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  // submit handler
  const onSubmit = handleSubmit(async (data) => {
    // check if passwords match
    if (data.password !== data.confirm_password) {
      errorToast("Passwords do not match");
      return;
    }

    try {
      // get users from api
      const users = (await (
        await axios.get(`${process.env.REACT_APP_HOST}/users/`)
      ).data) as User[];

      // check if username already exists
      const user =
        users.length > 0
          ? users.find((user) => user.username === data.username)
          : null;

      // if username already exists, throw error
      if (user) {
        errorToast("Username already exists");
        return;
      }

      await axios.post(`${process.env.REACT_APP_HOST}/users/`, {
        username: data.username,
        password: data.password,
      });

      // set to local storage and redirect to home page
      const newUsers = (await (
        await axios.get(`${process.env.REACT_APP_HOST}/users/`)
      ).data) as User[];

      // find created user in users array
      const newUser = newUsers.find((user) => user.username === data.username);

      localStorage.setItem("ova_user", JSON.stringify(newUser));
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong. Please try again.");
    }
  });

  return (
    <LoginLayout>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.headings}>
          <Link
            to="/login"
            className={pathname.includes("login") ? styles.active : ""}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={pathname.includes("register") ? styles.active : ""}
          >
            Register
          </Link>
        </div>

        {/* username */}
        <Label htmlFor="username" className={styles.label}>
          Username
        </Label>
        <Input
          id="username"
          className={styles.input}
          {...register("username", { required: true })}
        />

        {/* password */}
        <Label htmlFor="password" className={styles.label}>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          className={styles.input}
          {...register("password", { required: true })}
        />

        {/* confirm password */}
        <Label htmlFor="confirm_password" className={styles.label}>
          Confirm Password
        </Label>
        <Input
          id="confirm_password"
          type="password"
          className={styles.input}
          {...register("confirm_password", { required: true })}
        />

        <Button className={styles.button} fluid size="large">
          Register
        </Button>
      </form>
    </LoginLayout>
  );
};

export default Login;
