import logo from "assets/images/logo-light.jpg";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <main className={styles.main}>
      <img src={logo} alt="logo" />
      <h1 className={styles.heading}>
        Vote for the <span>Best Candidate</span> & Discover peace
      </h1>
    </main>
  );
};

export default Login;
