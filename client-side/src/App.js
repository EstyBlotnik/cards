import "./App.css";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [background, setBackground] = useState("");
  const [cards, setCards] = useState([]);

  const addCard = async () => {
    const newCard = { background: "#EEEEEE", text: "text" };
    try {
      await axios.post("http://localhost:5000/addCard", newCard);
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const loadingCards = () => {
    axios
      .get("http://localhost:5000/cards")
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadingCards();
  }, []);

  // פונקציה להחלפת המיקומים של הכרטיסים
  const moveCard = (dragIndex, hoverIndex) => {
    const updatedCards = [...cards];
    const [draggedCard] = updatedCards.splice(dragIndex, 1);
    updatedCards.splice(hoverIndex, 0, draggedCard);
    setCards(updatedCards); // עדכון הסטייט של cards עם המיקום המעודכן
  };

  return (
    <div className="App">
      <h1>All cards:</h1>
      {cards.length > 0 ? (
        <div className="cards">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              setBackground={setBackground}
              card={card}
              index={index}
              moveCard={moveCard} // מעביר את moveCard כ-prop
              setCards={setCards}
            />
          ))}
          <div className="card">
            <button className="add-card input-text" onClick={addCard}>
              +
            </button>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;