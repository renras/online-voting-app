import styles from "./Drawer.module.scss";
import logo from "assets/images/logo-light.png";

const Drawer = () => {
  return (
    <aside className={styles.drawer}>
      <img src={logo} alt="logo" />
    </aside>
  );
};

export default Drawer;
