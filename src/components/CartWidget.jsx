import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import cart from "../assets/ovni.png";

export const CartWidget = () => {
  const { items } = useContext(CartContext);

  const total = () => {
    if (items) {
      return items.reduce((acc, item) => acc + item.count, 0);
    } else {
      return 0;
    }
  };

  return (
    <Link to="/cart">
      <img src={cart} alt="Cart" width={80} />
      <span>{total()}</span>
    </Link>
  );
};
