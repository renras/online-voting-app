interface Props {
  name: string;
}

const Card = ({ name }: Props) => {
  return (
    <article>
      <p>{name}</p>
    </article>
  );
};

export default Card;
