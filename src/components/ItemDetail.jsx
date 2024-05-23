// import React, { useContext } from "react";
// import { Container } from "react-bootstrap";
// import { ItemCount } from "./ItemCount";
// import { CartContext } from "../context/CartContext";

// export const ItemDetail = ({ product }) => {
//   const { addItem } = useContext(CartContext);

//   const add = (quantity) => {
//     addItem(product, quantity);
//   };

//   return (
//     <Container className="mt-5">
//       <h1>{product.titulo}</h1>
//       <img
//         src={product.imagen}
//         style={{ height: 450, width: "auto" }}
//         alt={product.titulo}
//       />
//       <p>{product.descripcion}</p>
//       <div>{`Stock: ${product.stock}`}</div>
//       <div>{`Precio: $${product.precio}`}</div>
//       <ItemCount stock={product.stock} onAdd={add} />
//     </Container>
//   );
// };

import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ItemCount } from "./ItemCount";
import { CartContext } from "../context/CartContext";

export const ItemDetail = ({ product }) => {
  const { addItem } = useContext(CartContext);

  const add = (quantity) => {
    addItem(product, quantity);
  };

  return (
    <Container className="mt-5">
      <h1>{product.titulo}</h1>
      <img
        src={product.imagen}
        style={{ height: 450, width: "auto" }}
        alt={product.titulo}
      />
      <p>{product.descripcion}</p>
      <div>{`Stock: ${product.stock}`}</div>
      <div>{`Precio: $${product.precio}`}</div>
      <ItemCount stock={product.stock} onAdd={add} />
    </Container>
  );
};
