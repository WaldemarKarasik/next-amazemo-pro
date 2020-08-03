import Link from "next/link";
import { data } from "../../data";
import { wrapper } from "../../store/store";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { motion, useAnimation, useTransform } from "framer-motion";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, query }) => {
    const { data } = await Axios.get(
      `http://localhost:3000/api/product-details?id=${query.id}`
    );
    store.dispatch({ type: "PRODUCT_LOADED", payload: data });
  }
);

const ProductScreen = (props) => {
  const router = useRouter();
  const product = useSelector((state) => state.productDetails.product);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const [qty, setQty] = React.useState(1);
  const controls = useAnimation();
  const imageClickHanlder = () => {
    controls
      .start({
        x: 100,
      })
      .then(() => controls.start({ x: 0 }));
  };

  const handleAddToCart = () => {
    router.push({
      pathname: `/cart`,
      query: { id: product._id, qty },
    });
  };
  return (
    <main>
      <div>
        <Link href="/">
          <a>Назад</a>
        </Link>
      </div>
      <div className="details">
        <motion.div
          animate={controls}
          onClick={imageClickHanlder}
          className="details-image"
        >
          <img src={product.image} alt="product" />
        </motion.div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Звезд ({product.numReviews} Отызвов)
            </li>
            <li>
              Цена:<b> {product.price}&#8381;</b>
            </li>
            <li>
              Описание:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Цена: {product.price}&#8381;</li>
            <li>
              Статус:{" "}
              <span
                className={`product__item__status__${
                  product.countInStock > 0 ? "available" : "unavailable"
                }`}
              >
                {product.countInStock > 0 ? "В наличии" : "Недоступно"}
              </span>
            </li>
            <li>
              Кол-во:{" "}
              <select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </li>
            <li>
              {/* {product.countInStock > 0 ? (
                <button className="button primary" onClick={handleAddToCart}>
                  Add to cart
                </button>
              ) : (
                <div className="product_item__out-of-stock">Out Of Stock</div>
              )}
              {product.countInStock > 0 ? (
                !cartItems.filter((item) => item.product == product._id)
                  .length ? (
                  <button className="button primary" onClick={handleAddToCart}>
                    Добавить в корзину
                  </button>
                ) : (
                  <button className="button primary" disabled>
                    Уже в корзине
                  </button>
                )
              ) : (
                <div className="product_item__out-of-stock">Нет в наличии</div>
              )} */}

              {product.countInStock > 0 ? (
                <button className="button primary" onClick={handleAddToCart}>
                  Добавить в корзину
                </button>
              ) : (
                <div className="product_item__out-of-stock">Нет в наличии</div>
              )}

              {/* {product.countInStock > 0 ? (
                !cartItems.filter((item) => item.product == product._id)
                  .length ? (
                  <button className="button primary" onClick={handleAddToCart}>
                    Добавить в корзину
                  </button>
                ) : (
                  <button>Уже в корзине</button>
                )
              ) : (
                <div className="product_item__out-of-stock">Нет в наличии</div>
              )} */}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ProductScreen;
