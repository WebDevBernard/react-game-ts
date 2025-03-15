"use client";
import "./page.css";
import SingleCard from "../components/SingleCard";
import { useGame } from "@/hooks/useGame";
function App() {
  const {
    cards,
    turns,
    choiceOne,
    choiceTwo,
    disabled,
    victory,
    shuffleCards,
    handleChoice,
  } = useGame();

  return (
    <div>
      <h1>
        {!victory
          ? "Flip the Pokeball to find a matching Pokemon"
          : `It only took you ${turns} turns this time!`}
      </h1>

      <span className="menu">
        <button className="custom-button" onClick={shuffleCards}>
          <img className="front" src="/pokemon.svg" alt="pokemon" />{" "}
          <p>{!victory ? "New Game" : "Play Again"}</p>
        </button>
      </span>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            victory={victory}
          />
        ))}
      </div>
      <a
        href="https://www.flaticon.com/free-icons/pokemon"
        title="pokemon icons"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pokemon icons created by Roundicons Freebies - Flaticon
      </a>
    </div>
  );
}

export default App;
