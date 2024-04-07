import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { ItemList } from "./ItemList";
import { useParams } from "react-router-dom";

import data from "../data/products.json";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    const get = new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 2000);
    });

    get.then((data) => {
      if (!categoryId) {
        setProducts(data);
      } else {
        const filtered = data.filter(
          (product) => product.categoria === categoryId
        );
        setProducts(filtered);
      }
    });
  }, [categoryId]);

  return (
    <Container
      className="mt-5 d-flex"
      style={{ flexWrap: "wrap", justifyContent: "space-between" }}
    >
      <ItemList products={products} />
    </Container>
  );
};
