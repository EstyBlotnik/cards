import axios from "axios";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

export const Card = ({ setBackground, card, setCards, cards }) => {
  const [showColors, setShowColors] = useState(false);
  const [localText, setLocalText] = useState(card.text);
  const colors = ["#FFF9D0", "#BFECFF", "#CDC1FF", "#FFCCEA"];
  const updateColor = async (color) => {
    setBackground(color);
    try {
      // ביצוע בקשת PUT
      const response = await axios.put(
        `http://localhost:5000/cards/${card.id}`,
        {
          background: color,
          text: card.text,
        }
      );

      console.log("Data updated successfully:", response.data);
      setShowColors(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const updateText = async (e) => {
    setLocalText(e.target.value);
    try {
      // ביצוע בקשת PUT
      const response = await axios.put(
        `http://localhost:5000/cards/${card.id}`,
        {
          background: card.background,
          text: e.target.value,
        }
      );

      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteCard = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/cards/${card.id}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      alert(error);
    }
  };
  return (
    <div className="card" style={{ backgroundColor: card.background }}>
      <input
        className="input-text"
        value={localText}
        name="text"
        onChange={updateText}
      />
      {showColors ? (
        <div className="cards">
          {colors.map((color, index) => (
            <button
              key={index}
              className="color-button"
              style={{ backgroundColor: color }}
              onClick={() => {
                updateColor(color);
              }}
            ></button>
          ))}
        </div>
      ) : (
        <div className="icons">
          <button
            className="color-button"
            onClick={() => {
              setShowColors(true);
            }}
          ></button>
          <button className="input-text" onClick={deleteCard}>
            <RiDeleteBinLine />
          </button>
        </div>
      )}
    </div>
  );
};
