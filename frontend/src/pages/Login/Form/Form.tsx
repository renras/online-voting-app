import styles from "./Form.module.scss";
import Label from "components/Label/Label";

const Form = () => {
  return (
    <form className={styles.form}>
      <div className={styles.headings}>
        <h2 className={styles.active}>Login</h2>
        <h2>Register</h2>
      </div>
      <Label htmlFor="username" className={styles.label}>
        Username
      </Label>
    </form>
  );
};

export default Form;
