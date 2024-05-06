import { useContext, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Container } from "react-bootstrap";
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
    setValues((prev) => {
      return { ...prev, [ev.target.name]: ev.target.value };
    });
  };

  const handleSubmit = () => {
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
          alert("Se realizo correctamente la compra de: " + id);
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
      <h1>Productos</h1>
      {items.map((i) => {
        return (
          <ul key={i.id}>
            <li>Producto: {i.title}</li>
            <li>Cantidad: {i.count}</li>
            <li>$: {i.price}</li>
            <li onClick={() => handleRemove(i.id)}>Eliminar</li>
          </ul>
        );
      })}

      <div>Total: ${total()}</div>
      <button onClick={handleClear}>Vaciar</button>
      {items?.length > 0 && (
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            value={values.name}
            name="name"
            onChange={handleChange}
          />
          <label>Celular</label>
          <input
            type="text"
            value={values.phone}
            name="phone"
            onChange={handleChange}
          />
          <label>Mail</label>
          <input
            type="text"
            value={values.mail}
            name="mail"
            onChange={handleChange}
          />
          <button type="submit">Enviar</button>
        </form>
      )}
    </Container>
  );
};
