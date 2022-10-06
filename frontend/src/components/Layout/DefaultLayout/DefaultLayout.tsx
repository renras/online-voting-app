import Drawer from "components/Drawer/Drawer";
import { useState, ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";
import Button from "components/Button/Button";
import { User } from "types/user";
import { useNavigate } from "react-router-dom";
import IconMenu from "assets/icons/icon-menu.svg";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const ova_user = JSON.parse(`${localStorage.getItem("ova_user")}`) as User;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ova_user");
    navigate("/login", { replace: true });
  };

  if (!ova_user) return <div>Not Authorized</div>;

  return (
    <div className={styles.layout}>
      {isDrawerOpen && (
        <div className={styles.mobileDrawer}>
          <Drawer
            onClose={() => setIsDrawerOpen(false)}
            className={styles.animation}
          />
        </div>
      )}
      <div className={styles.drawer}>
        <Drawer />
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <button
            className={styles.menuButton}
            onClick={() => setIsDrawerOpen(true)}
          >
            <img src={IconMenu} alt="open drawer" />
          </button>
          <h1 className={styles.heading1}>Election 2022</h1>
          <div className={styles.user}>
            <p>Welcome, &nbsp;{ova_user.username}!</p>
          </div>

          <Button
            className={styles.logoutButton}
            size="small"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
