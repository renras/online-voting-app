import styles from "./Form.module.scss";

const Form = () => {
  return (
    <form className={styles.form}>
      <div className={styles.headings}>
        <h2 className={styles.active}>Login</h2>
        <h2>Register</h2>
      </div>
    </form>
  );
};

export default Form;
