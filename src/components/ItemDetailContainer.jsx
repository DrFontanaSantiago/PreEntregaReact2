import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ItemDetail } from "./ItemDetail";

// export const ItemDetailContainer = () => {
//   const [product, setProduct] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const db = getFirestore();
//     const itemRef = doc(db, "orders", id);

//     getDoc(itemRef)
//       .then((doc) => {
//         if (doc.exists()) {
//           setProduct({ id: doc.id, ...doc.data() });
//         } else {
//           console.error("No such document!");
//         }
//       })
//       .catch((error) => {
//         console.error("Error getting document:", error);
//       });
//   }, [id]);

//   return (
//     <div>{product ? <ItemDetail product={product} /> : <p>Loading...</p>}</div>
//   );
// };
const ItemDetailContainer = () => {
  const [order, setOrder] = useState(null);
  const orderId = "HjmTWk9eYjDSCnWB2rn"; // Asegúrate de que este ID es correcto y existe en tu base de datos

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await db.collection("orders").doc(orderId).get();
        if (!orderDoc.exists) {
          console.error("No such document!");
        } else {
          setOrder(orderDoc.data());
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {orderId}</p>
      <p>Order Data: {JSON.stringify(order)}</p>
    </div>
  );
};

export default ItemDetailContainer;
