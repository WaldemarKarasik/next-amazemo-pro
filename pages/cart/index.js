import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

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
      {cartItems.length == 0 ? (
        <h3>Корзина пуста</h3>
      ) : (
        <div className="cart">
          <div className="cart__list">
            <ul className="cart__list__container">
              <li>
                <h3 style={{ margin: 0, padding: 0 }}>Корзина</h3>
                <div>Цена</div>
              </li>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="cart__list__item" key={item.product}>
                    <div className="cart__list__item__image__container">
                      <img src={item.image} />
                      <div className="cart__list__product-info">
                        <div className="cart__list__product-info__name">
                          <Link
                            href="/products/[id]"
                            as={`/products/${item.product}`}
                          >
                            <a>{item.name}</a>
                          </Link>
                        </div>
                        <div className="cart__list__product-info__qty">
                          Кол-во:
                          <select
                            value={item.qty}
                            onChange={(e) => {
                              item.qty = parseInt(e.target.value, 10);
                              dispatch({
                                type: "CLIENT_ADD_TO_CART",
                                payload: item,
                              });
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="cart__list__product-info__delete">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "CLIENT_REMOVE_FROM_CART",
                                payload: item.product,
                              })
                            }
                          >
                            Убрать
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="product-price">{item.price}&#8381;</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart__action">
            {cartItems.length ? (
              <>
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
                <button
                  disabled={cartItems.length == 0}
                  className="button primary"
                  onClick={checkOutHandler}
                >
                  Продолжить покупку
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
