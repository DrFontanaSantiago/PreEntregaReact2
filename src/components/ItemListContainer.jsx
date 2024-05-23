import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Container } from "react-bootstrap";
import { ItemList } from "./ItemList";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const productsCollection = collection(db, "products");
    const q = categoryId
      ? query(productsCollection, where("categoria", "==", categoryId))
      : productsCollection;

    getDocs(q).then((querySnapshot) => {
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });
  }, [categoryId]);

  return (
    <Container className="mt-5">
      <ItemList products={products} />
    </Container>
  );
};
