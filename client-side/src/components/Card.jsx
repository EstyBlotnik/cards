import axios from "axios";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDrag, useDrop } from "react-dnd";

export const Card = ({ setBackground, card, index, moveCard ,setCards}) => {
  const [showColors, setShowColors] = useState(false);
  const [localText, setLocalText] = useState(card.text);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "CARD",
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index); // עדכון המיקום של הכרטיסים
        item.index = index;
      }
    },
  }));
  const colors = ["#FFF9D0", "#BFECFF", "#CDC1FF", "#FFCCEA"];
  const updateColor = async (color) => {
    setBackground(color);
    try {
      await axios.put(`http://localhost:5000/cards/${card.id}`, {
        background: color,
        text: localText,
      });
      setCards((prevCards) => {
        return prevCards.map(c => {
          if (c.id === card.id) {
            // החזרת הכרטיס עם השינויים החדשים
            return { ...c, background:color }; // עדכון הכרטיס עם הנתונים החדשים
          }
          return c; // החזרת כרטיסים אחרים כפי שהם
        });
      });
      setShowColors(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const updateText = async (e) => {
    setLocalText(e.target.value); // עדכון ה- localText לשדה הטקסט המקומי
    try {
      await axios.put(`http://localhost:5000/cards/${card.id}`, {
        background: card.background,
        text: e.target.value,
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteCard = async () => {
    try {
      await axios.delete(`http://localhost:5000/cards/${card.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="card"
      style={{
        backgroundColor: card.background,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
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
