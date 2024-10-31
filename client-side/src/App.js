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
      // ביצוע בקשת PUT
      await axios.post(
        "http://localhost:5000/addCard",
        newCard
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  useEffect(() => {
    loadingCards();
  }, [background]);
  const loadingCards = () => {
    axios
      .get("http://localhost:5000/cards")
      .then((response) => {
        setCards(response.data);
        console.log(response.data); // הדפסת הנתונים שהתקבלו
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>All cards:</h1>
      {cards.length > 0 ? (
        <div className="cards">
          {cards.map((card, index) => (
            <Card
              key={index}
              setBackground={setBackground}
              card={card}
              setCards={setCards}
              cards={cards}
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
