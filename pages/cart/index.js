import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { Button, Popconfirm, Empty, Row, Col, Typography } from "antd";

export async function getServerSideProps({ query, req, res }) {
  const { id } = query;
  const qty = query.qty ? query.qty : 1;
  if (id) {
    try {
      const { data } = await Axios.get(
        `http://localhost:3000/api/products?id=${id}`
      );
      data.qty = qty;
      return { props: { data } };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  } else {
    return { props: { data: {} } };
  }
}

const Cart = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    if (Object.keys(data).length) {
      dispatch({
        type: "CLIENT_ADD_TO_CART",
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: parseInt(data.price, 10),
          countInStock: data.countInStock,
          qty: parseInt(data.qty, 10),
        },
      });
    }
  }, []);
  useEffect(() => {
    Cookie.set("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const checkOutHandler = () => {
    router.push({ pathname: "/signin", query: { redirect: "shipping" } });
  };

  return (
    <>
      {cartItems.length ? (
        <div className="cart">
          <div className="cart-items__container">
            <ul>
              {cartItems.map((product) => (
                <>
                  <li className="cart-items__item">
                    <div className="cart-items__item__image__container">
                      <img
                        src={product.image}
                        className="cart-items__item__image__item"
                      ></img>
                    </div>
                    <div className="cart-items__item__info">
                      <div className="cart-items__item__name">
                        {product.name}
                      </div>
                      <div className="cart-items__item__price">
                        <h4>{product.price}&#8381;</h4>
                      </div>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <div className="cart-items__action">
            <div>
              <h3>
                Итого ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                {" предметов"}
                ):
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.qty,
                  0
                )}
                &#8381;
              </h3>
            </div>
            <div className="cart-items__action__button-container">
              <button className="button primary">Оформить заказ</button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Empty description="Корзина пуста" />
        </div>
      )}
    </>
  );
};

export default Cart;
