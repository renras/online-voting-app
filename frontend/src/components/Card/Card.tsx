import styles from "./Card.module.scss";
import Button from "components/Button/Button";

interface Props {
  name: string;
  photo: string;
  isVoter?: boolean;
}

const Card = ({ name, photo, isVoter = false }: Props) => {
  return (
    <article className={styles.container}>
      <div className={styles.imgWrapper}>
        <img src={photo} alt={`${name}`} />
      </div>
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        {isVoter && (
          <Button size="small" theme="secondary" className={styles.button}>
            Vote
          </Button>
        )}
      </div>
    </article>
  );
};

export default Card;
