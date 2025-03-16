import { useState, useEffect, useCallback } from "react";
import { Card, cardImages } from "@/lib/data";

export function useGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);

  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [victory, setVictory] = useState<boolean>(false);
  const [gameData, setGameData] = useState<{
    highScore: number;
    gamesPlayed: number;
    lastHighScore: number;
  } | null>(null);

  // Randomizes cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setVictory(false);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a card choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reset the turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Find when all cards match
  const findVictory = useCallback(() => {
    let counter = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].matched) {
        counter += 1;
      }
    }
    return counter;
  }, [cards]);

  // Compare the selected cards
  useEffect(() => {
    if (findVictory() === cards.length) {
      setVictory(true);

      if (gameData) {
        const newGameData = { ...gameData };
        if (turns <= gameData.highScore) {
          newGameData.lastHighScore = newGameData.highScore;
          newGameData.highScore = turns;
        }
        newGameData.gamesPlayed += 1;
        setGameData(newGameData);
        localStorage.setItem("reactGameData", JSON.stringify(newGameData));
      }
    }
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (choiceTwo.id !== choiceOne.id && card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, cards.length, findVictory]);

  // Start the game automatically
  useEffect(() => {
    const storedGameData = localStorage.getItem("reactGameData");
    if (storedGameData) {
      setGameData(JSON.parse(storedGameData));
    } else {
      // Set initial game data if no data is found
      setGameData({ highScore: 9999, gamesPlayed: 0, lastHighScore: 9999 });
    }
    shuffleCards();
  }, []);

  const message = (() => {
    if (!victory) {
      return "Flip the Pokeball to find a matching Pokemon";
    }
    if (gameData && gameData.gamesPlayed === 1) {
      return `Play again, beat your record of ${turns} turns!`;
    }
    if (victory && turns > gameData!.highScore) {
      return `It took you ${turns} turns, your record is ${
        gameData!.highScore
      } turns!`;
    }
    if (victory && gameData!.highScore === gameData!.lastHighScore) {
      return `You just tied your record with ${turns} turns!`;
    }
    if (victory && gameData!.highScore < gameData!.lastHighScore) {
      return `You set a new record with ${turns} turns!`;
    }

    return "Something went wrong here";
  })();
  return {
    message,
    cards,
    turns,
    choiceOne,
    choiceTwo,
    disabled,
    victory,
    shuffleCards,
    handleChoice,
  };
}
