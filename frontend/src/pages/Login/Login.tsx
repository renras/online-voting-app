import styles from "./Login.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useLocation } from "react-router-dom";
import LoginLayout from "components/Layout/LoginLayout/LoginLayout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorToast } from "utils/toast";
import { User } from "types/user";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const { pathname } = useLocation();
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const users = (await (
      await axios.get(`${process.env.REACT_APP_HOST}/users/`)
    ).data) as User[];

    console.log(users);

    const user =
      users.length > 0
        ? users.find(
            (user) =>
              user.username === data.username && user.password === data.password
          )
        : null;

    if (!user) {
      errorToast("Invalid username or password");
      return;
    }

    if (user) {
      localStorage.setItem("ova_user", JSON.stringify(user));
      window.location.href = "/";
      navigate("/", { replace: true });
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
