import "./ItemDetail.css";
import Contador from "../Contador/Contador";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const notify = () =>
  toast.success("Agregado con éxito al Carrito de Compras.", {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

const ItemDetail = ({ id, nombre, precio, stock, img, description }) => {
  const [adicionar, setAdicionar] = useState(0);

  const { addProduct } = useContext(CartContext);

  const handlerAdicionar = (qty) => {
    setAdicionar(qty);

    const item = { id, nombre, precio };
    addProduct(item, qty);
    notify();
  };
  return (
    <div className="flexcss">
      <div className="card m-3" style={{ width: "19rem" }}>
        <img
          src={img}
          className="card-img-top mt-1 imgProducto mx-auto"
          alt={nombre}
        />
        <div className="card-body flex-row m-3">
          <h5 className="card-title text-center">{nombre}</h5>
          <p className="card-text text-center m-1">{description}</p>
          <p className="card-text text-center m-1">ID: {id}</p>
          <p className="card-text text-center m-1">Precio: {precio}</p>
          <p className="card-text text-center m-1">Stock {stock}</p>
          {adicionar > 0 ? (
            <div>
              <Link to="/cart">
                {" "}
                <button className="btn btn-primary d-grid gap-2 col-6 mx-auto m-1">
                  Ver carrito
                </button>
              </Link>
              <Link to="/">
                {" "}
                <button className="btn btn-primary d-grid gap-2 col-6 mx-auto m-1">
                  Ver más
                </button>
              </Link>
            </div>
          ) : (
            <Contador
              stockTotal={stock}
              inicial={1}
              adicionarItem={handlerAdicionar}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
