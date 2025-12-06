import "./SingleCard.css";
import { Card } from "@/lib/data";
interface SingleCardProps {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
  victory: boolean;
  shuffling: boolean;
}

export default function SingleCard({
  card,
  handleChoice,
  flipped,
  disabled,
  victory,
  shuffling,
}: SingleCardProps) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={`${flipped ? "flipped" : ""} ${!flipped && "rotate"}`}>
        <img
          className={`front ${
            flipped && flipped === card.matched && "bounce"
          } ${victory && "victory"}`}
          src={card.src}
          alt={card.name}
        />
        <img
          className={`back ${shuffling && !flipped ? "shuffle-bounce" : ""}`}
          src="/pokeball.svg"
          alt="card back"
          onClick={handleClick}
          onDoubleClick={handleClick}
        />
      </div>
    </div>
  );
}
