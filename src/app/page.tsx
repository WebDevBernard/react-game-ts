"use client";
import "./page.css";
import SingleCard from "../components/SingleCard";
import { useGame } from "@/hooks/useGame";
function App() {
  const {
    cards,
    choiceOne,
    choiceTwo,
    disabled,
    victory,
    shuffling,
    shuffleCards,
    handleChoice,
    message,
  } = useGame();

  return (
    <div className="game-container">
      <a
        href="https://www.flaticon.com/free-icons/pokemon"
        title="pokemon icons"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pokemon icons created by Roundicons Freebies - Flaticon
      </a>
      <h1>{message}</h1>
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
            shuffling={shuffling}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
