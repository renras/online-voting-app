import styles from "./Drawer.module.scss";
import logo from "assets/images/logo-light.png";
import iconElection from "assets/icons/icon-election.svg";
import iconHome from "assets/icons/icon-home.svg";
import iconResults from "assets/icons/icon-results.svg";
import iconVoters from "assets/icons/icon-voters.svg";

const Drawer = () => {
  return (
    <aside className={styles.drawer}>
      <img src={logo} alt="logo" />
      <nav className={styles.nav}>
        <a href="/">
          <img src={iconHome} alt="home icon" />
          Home
        </a>
        <a href="/election">
          <img src={iconElection} alt="election icon" />
          Election
        </a>
        <a href="/voters">
          <img src={iconVoters} alt="voters icon" />
          Voters
        </a>
        <a href="results">
          <img src={iconResults} alt="results icon" />
          Results
        </a>
      </nav>
    </aside>
  );
};

export default Drawer;
