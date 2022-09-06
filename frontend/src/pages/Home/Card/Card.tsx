import styles from "./Card.module.scss";
import Button from "components/Button/Button";

interface Props {
  name: string;
}

const Card = ({ name }: Props) => {
  return (
    <article className={styles.container}>
      <div className={styles.img}></div>

      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <Button size="small" className={styles.button}>
          Vote
        </Button>
      </div>
    </article>
  );
};

export default Card;
