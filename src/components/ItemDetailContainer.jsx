import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import data from "../data/products.json";

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    const get = new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 2000);
    });

    get.then((data) => {
      const filter = data.find((product) => product.id === itemId);

      setProduct(filter);
    });
  }, [itemId]);

  if (!product) return <div>Cargando...</div>;

  return (
    <Container
      className="mt-5 d-flex"
      style={{ flexWrap: "wrap", justifyContent: "space-between" }}
    >
      <h1>{product.titulo}</h1>
      <img src={product.imagen} alt={product.titulo} />
    </Container>
  );
};
