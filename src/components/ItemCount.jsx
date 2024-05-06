import React, { useState } from "react";

export const ItemCount = ({ onAdd, stock }) => {
  const [count, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (count > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (stock > count) setQuantity((prev) => prev + 1);
  };

  const handleAdd = () => {
    onAdd(count);
    setQuantity(1);
  };

  return (
    <div className="d-flex">
      <div
        style={{ padding: "0 10px", color: "red", fontWeight: "bold" }}
        onClick={handleDecrease}
      >
        -
      </div>
      <input
        type="number"
        value={count}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <div
        style={{ padding: "0 10px", color: "red", fontWeight: "bold" }}
        onClick={handleIncrease}
      >
        +
      </div>
      <button type="button" onClick={handleAdd}>
        Agregar al carrito
      </button>
    </div>
  );
};
