const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let cards = [
  { id: 1, text: "text 1", background: "#FFF9D0" },
  { id: 2, text: "text 2", background: "#CDC1FF" },
];

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.post("/addCard", (req, res) => {
  const cardId = cards[cards.length - 1].id + 1;
  const card = {
    id: cardId,
    text: req.body.text,
    background: req.body.background,
  };
  cards.push(card);
  console.log(cards);
  res.status(200).json({ message: "Card uddad successfully", card });
});

app.put("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const { text, background } = req.body;
  const cardIndex = cards.findIndex((card) => card.id === cardId);

  if (cardIndex !== -1) {
    cards[cardIndex] = { ...cards[cardIndex], text, background };
    res
      .status(200)
      .json({ message: "Card updated successfully", card: cards[cardIndex] });
  } else {
    res.status(404).json({ message: "Card not found" });
  }
  console.log(cards);
});

app.get("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find((c) => c.id === cardId);
  if (card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: "card not found" });
  }
  console.log(cards);
});

app.delete("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id); // המרת ה-ID ל-מספר שלם
  const cardIndex = cards.findIndex((c) => c.id === cardId);
  console.log(cardIndex);
  if (cardIndex === -1) {
    return res.status(404).json({ message: "Card not found" });
  }
  cards = cards.filter((card) => card.id !== cardId);
  console.log(cards);
  res.status(200).json({ message: "Card deleted successfully" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`השרת פועל בכתובת http://localhost:${PORT}`);
});
