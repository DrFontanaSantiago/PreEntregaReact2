import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Container, Form, Button } from "react-bootstrap";

const Checkout = () => {
  const { items, clear } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      buyer: { name, email, address, phone },
      items,
      date: new Date(),
      total: items.reduce((acc, item) => acc + item.price * item.count, 0),
    };

    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    try {
      const docRef = await addDoc(ordersCollection, order);
      console.log("Order ID: ", docRef.id);
      clear();
      alert("Compra realizada con éxito!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Hubo un error al procesar la compra.");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Checkout</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Ingrese su teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Finalizar Compra
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
