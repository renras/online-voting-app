import styles from "./Card.module.scss";

interface Props {
  name: string;
}

const Card = ({ name }: Props) => {
  return (
    <article className={styles.container}>
      <div className={styles.img}></div>
      <p>{name}</p>
    </article>
  );
};

export default Card;
