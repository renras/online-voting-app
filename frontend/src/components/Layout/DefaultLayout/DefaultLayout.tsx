import Drawer from "components/Drawer/Drawer";
import { ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";
import avatar from "assets/images/avatar.png";
import Button from "components/Button/Button";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Drawer />
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.heading1}>Election 2022</h1>
          <div className={styles.user}>
            <img src={avatar} alt="avatar" className={styles.avatar} />
            <p>Sarwendah Onsai</p>
          </div>
          <Button className={styles.logoutButton} size="small">
            Logout
          </Button>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
