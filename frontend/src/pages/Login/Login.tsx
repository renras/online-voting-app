import styles from "./Login.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useLocation } from "react-router-dom";
import LoginLayout from "components/Layout/LoginLayout/LoginLayout";

const Login = () => {
  const { pathname } = useLocation();

  return (
    <LoginLayout>
      <form className={styles.form}>
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
        <Input id="username" className={styles.input} />

        <Label htmlFor="password" className={styles.label}>
          Password
        </Label>
        <Input id="password" type="password" className={styles.input} />

        <Button className={styles.button} fluid size="large">
          Login
        </Button>
      </form>
    </LoginLayout>
  );
};

export default Login;
