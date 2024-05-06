import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { ItemDetail } from "./ItemDetail";

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "products", itemId);

    getDoc(docRef).then((snapshot) => {
      setProduct({ id: snapshot.id, ...snapshot.data() });
    });
  }, [itemId]);

  if (!product) return <div>Cargando...</div>;

  return <ItemDetail product={product} />;
};
