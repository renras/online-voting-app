import styles from "./Form.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";

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
      <Input id="username" className={styles.input} />
    </form>
  );
};

export default Form;
