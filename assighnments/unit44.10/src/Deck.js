import React, { useEffect, useState } from "react";
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(function loadDeckFromAPI() {
    async function fetchData() {
      try {
        const response = await fetch(`${API_BASE_URL}/new/shuffle/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDeck(data);
      } catch (err) {
        alert(`Failed to load deck: ${err.message}`);
      }
    }
    fetchData();
  }, []);

  async function draw() {
    try {
      const response = await fetch(`${API_BASE_URL}/${deck.deck_id}/draw/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.remaining === 0) throw new Error("Deck empty!");

      const card = data.cards[0];

      setDrawn((d) => [
        ...d,
        {
          id: card.code,
          name: `${card.suit} ${card.value}`,
          image: card.image,
        },
      ]);
    } catch (err) {
      alert(err.message);
    }
  }

  async function startShuffling() {
    setIsShuffling(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      setDrawn([]);
    } catch (err) {
      alert(`Failed to shuffle deck: ${err.message}`);
    } finally {
      setIsShuffling(false);
    }
  }

  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
      <button onClick={draw} disabled={isShuffling}>
        Draw
      </button>
    );
  }

  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
      <button onClick={startShuffling} disabled={isShuffling}>
        Shuffle
      </button>
    );
  }

  return (
    <main>
      {renderDrawBtnIfOk()}
      {renderShuffleBtnIfOk()}

      <div>
        {drawn.map((c) => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
