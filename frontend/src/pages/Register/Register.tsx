import styles from "./Register.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useLocation } from "react-router-dom";
import LoginLayout from "components/Layout/LoginLayout/LoginLayout";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
  confirm_password: string;
}

const Login = () => {
  const { pathname } = useLocation();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => console.log(data));

  return (
    <LoginLayout>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.headings}>
          <a
            href="/login"
            className={pathname.includes("login") ? styles.active : ""}
          >
            Login
          </a>
          <a
            href="/register"
            className={pathname.includes("register") ? styles.active : ""}
          >
            Register
          </a>
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
