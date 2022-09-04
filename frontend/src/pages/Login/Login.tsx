import logo from "assets/images/logo-light.jpg";
import pollingPlace from "assets/images/polling-place.jpg";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <main className={styles.main}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.leftColumn}>
        <h1 className={styles.heading}>
          Vote for the <span>Best Candidate</span> & Discover peace
        </h1>
        <img
          src={pollingPlace}
          alt="polling place"
          className={styles.pollingImg}
        />
      </div>
      <form className={styles.form}>Form</form>
    </main>
  );
};

export default Login;
