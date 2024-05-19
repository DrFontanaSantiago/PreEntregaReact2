import { useEffect, useState } from "react";
import { db } from "../main";
import Container from "react-bootstrap/Container";
import { ItemList } from "./ItemList";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const productsCollection = collection(db, "products");

    getDocs(productsCollection).then((querySnapshot) => {
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (!categoryId) {
        setProducts(productsData);
      } else {
        const filtered = productsData.filter(
          (product) => product.categoria === categoryId
        );
        setProducts(filtered);
      }
    });
  }, [categoryId]);

  if (!products.length) return <div>Cargando...</div>;

  return (
    <Container className="mt-5">
      <ItemList products={products} />
    </Container>
  );
};
