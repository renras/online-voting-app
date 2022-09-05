import Drawer from "components/Drawer/Drawer";
import { ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Drawer />
      {children}
    </div>
  );
};

export default Layout;
