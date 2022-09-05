import styles from "./Form.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

const Form = () => {
  return (
    <form className={styles.form}>
      <div className={styles.headings}>
        <h2 className={styles.active}>Login</h2>
        <h2>Register</h2>
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

      <Button className={styles.button} fluid>
        Login
      </Button>
    </form>
  );
};

export default Form;
