import { useContext, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Container, Button, Form, ListGroup, Row, Col } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const initialValues = {
  name: "",
  phone: "",
  email: "",
};

export const Cart = () => {
  const [values, setValues] = useState(initialValues);
  const { clear, items, removeItem } = useContext(CartContext);

  const total = () => {
    return items.reduce((acc, item) => acc + item.count * item.price, 0);
  };

  const handleChange = (ev) => {
    setValues((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const order = {
      buyer: values,
      items: items,
      total: total(),
    };

    const db = getFirestore();
    const orderCollection = collection(db, "orders");

    addDoc(orderCollection, order)
      .then(({ id }) => {
        if (id) {
          alert("Se realizó correctamente la compra de: " + id);
        }
      })
      .finally(() => {
        clear();
        setValues(initialValues);
      });
  };

  const handleClear = () => {
    clear();
  };

  const handleRemove = (id) => {
    removeItem(id);
  };

  return (
    <Container className="mt-5">
      <h1>Carrito de Compras</h1>
      {items.map((item) => (
        <ListGroup key={item.id}>
          <ListGroup.Item>
            <Row>
              <Col>Producto:</Col>
              <Col>{item.titulo}</Col>{" "}
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Cantidad:</Col>
              <Col>{item.count}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Precio unitario:</Col>
              <Col>${item.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Precio total:</Col>
              <Col>${item.count * item.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="danger" onClick={() => handleRemove(item.id)}>
              Eliminar
            </Button>
          </ListGroup.Item>
        </ListGroup>
      ))}

      <h2>Total: ${total()}</h2>
      <Button variant="warning" onClick={handleClear}>
        Vaciar
      </Button>
      {items?.length > 0 && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={values.name}
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              value={values.phone}
              name="phone"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={values.email}
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      )}
    </Container>
  );
};
