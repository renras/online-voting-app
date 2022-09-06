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
      <div>
        <header className={styles.header}>
          <div></div>
          <img src={avatar} alt="avatar" />
          Sarwendah Onsai
          <Button className={styles.button} size="small">
            Logout
          </Button>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
