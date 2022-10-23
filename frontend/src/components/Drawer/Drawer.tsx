import styles from "./Drawer.module.scss";
import logo from "assets/images/logo-light.png";
import iconElection from "assets/icons/icon-election.svg";
import iconHome from "assets/icons/icon-home.svg";
import iconResults from "assets/icons/icon-results.svg";
import iconElectionPurple from "assets/icons/icon-election-purple.svg";
import iconHomePurple from "assets/icons/icon-home-purple.svg";
import iconResultsPurple from "assets/icons/icon-results-purple.svg";
import { useLocation, Link } from "react-router-dom";
import { User } from "types/user";
import IconClose from "assets/icons/icon-close-light.svg";
import { MouseEventHandler } from "react";
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Drawer = ({ onClose, className }: Props) => {
  const { pathname } = useLocation();

  const homeIcon = pathname === "/" ? iconHomePurple : iconHome;
  const electionIcon =
    pathname === "/election" ? iconElectionPurple : iconElection;
  const resultsIcon = pathname === "/results" ? iconResultsPurple : iconResults;
  const ova_user = JSON.parse(`${localStorage.getItem("ova_user")}`) as User;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ova_user");
    navigate("/login", { replace: true });
  };

  return (
    <aside className={`${styles.drawer} ${className}`}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={IconClose} alt="close drawer" />
        </button>
        <img src={logo} alt="logo" />
        <nav className={styles.nav}>
          <Link to="/" className={pathname === "/" ? styles.active : ""}>
            <img src={homeIcon} alt="home icon" />
            Home
          </Link>
          {ova_user?.is_admin === 1 && (
            <Link
              to="/election"
              className={pathname === "/election" ? styles.active : ""}
            >
              <img src={electionIcon} alt="election icon" />
              Election
            </Link>
          )}
          <Link
            to="/results"
            className={pathname === "/results" ? styles.active : ""}
          >
            <img src={resultsIcon} alt="results icon" />
            Live Results
          </Link>
        </nav>

        <div className={styles.bottomActions}>
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
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
