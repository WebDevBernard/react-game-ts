import { useState, useEffect, useCallback } from "react";
import { Card, cardImages } from "@/lib/data";

export function useGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [victory, setVictory] = useState<boolean>(false);

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
    shuffleCards();
  }, []);

  return {
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
