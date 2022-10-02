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

const Drawer = () => {
  const { pathname } = useLocation();

  const homeIcon = pathname === "/" ? iconHomePurple : iconHome;
  const electionIcon =
    pathname === "/election" ? iconElectionPurple : iconElection;
  const resultsIcon = pathname === "/results" ? iconResultsPurple : iconResults;
  const ova_user = JSON.parse(`${localStorage.getItem("ova_user")}`) as User;

  return (
    <aside className={styles.drawer}>
      <img src={logo} alt="logo" />
      <nav className={styles.nav}>
        <Link to="/" className={pathname === "/" ? styles.active : ""}>
          <img src={homeIcon} alt="home icon" />
          Home
        </Link>
        <Link
          to="/election"
          className={pathname === "/election" ? styles.active : ""}
        >
          <img src={electionIcon} alt="election icon" />
          Election
        </Link>
        <Link
          to="/results"
          className={pathname === "/results" ? styles.active : ""}
        >
          <img src={resultsIcon} alt="results icon" />
          Live Results
        </Link>
      </nav>
    </aside>
  );
};

export default Drawer;
