import styles from "./Card.module.scss";
import Button from "components/Button/Button";

interface Props {
  name: string;
  image: string;
}

const Card = ({ name, image }: Props) => {
  return (
    <article className={styles.container}>
      <div className={styles.imgWrapper}>
        <img src={image} alt={`${name}`} />
      </div>
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <Button size="small" theme="secondary" className={styles.button}>
          Vote
        </Button>
      </div>
    </article>
  );
};

export default Card;
