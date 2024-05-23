import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ItemDetail } from "./ItemDetail";

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const itemRef = doc(db, "products", id);

    getDoc(itemRef)
      .then((doc) => {
        if (doc.exists()) {
          setProduct({ id: doc.id, ...doc.data() });
        } else {
          console.error("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, [id]);

  return (
    <div>{product ? <ItemDetail product={product} /> : <p>Loading...</p>}</div>
  );
};
