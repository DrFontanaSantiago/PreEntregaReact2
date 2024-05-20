import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const Item = ({ product }) => {
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem({ ...product, price: Number(product.precio) }, 1);
  };

  return (
    <Card className="mb-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product.imagen} />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Card.Title>{product.titulo}</Card.Title>
        <Card.Text>{product.descripcion}</Card.Text>
        <Card.Text>{product.categoria}</Card.Text>
        {product.precio && <Card.Text>${product.precio}</Card.Text>}
        <Button variant="primary" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
        <Link to={`/item/${product.id}`}>
          <Button variant="secondary">Conocé Más!</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
